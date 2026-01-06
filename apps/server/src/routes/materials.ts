import { Router } from "express";
import { pool } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";
import fs from "fs";

export const materialRoutes = Router();

// Konfigurace nahrávání 
const ALLOWED_MIMES = [
    'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain',
    'image/png', 'image/jpeg', 'image/gif',
    'video/mp4', 'audio/mpeg'
];

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 30 * 1024 * 1024 }, // 30 MB
    fileFilter: (req, file, cb) => {
        if (ALLOWED_MIMES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('INVALID_FORMAT'));
        }
    }
});

// 1. Získání materiálů pro konkrétní kurz (od nejnovějšího)
materialRoutes.get("/course/:courseUuid", async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM materials WHERE course_uuid = ? ORDER BY created_at DESC",
            [req.params.courseUuid]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// 2. Přidání souboru
materialRoutes.post("/course/:courseUuid/file", (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const { name, description } = req.body;
        const uuid = uuidv4();

        try {
            await pool.execute(
                "INSERT INTO materials (uuid, course_uuid, name, description, type, content, mime_type) VALUES (?, ?, ?, ?, 'file', ?, ?)",
                [uuid, req.params.courseUuid, name, description, req.file.filename, req.file.mimetype]
            );
            res.status(201).json({ uuid, name, type: 'file' });
        } catch (dbErr) {
            res.status(500).json({ error: "Database error" });
        }
    });
});

// 3. Přidání odkazu (URL)
materialRoutes.post("/course/:courseUuid/url", async (req, res) => {
    const { name, description, url } = req.body;
    const uuid = uuidv4();

    try {
        await pool.execute(
            "INSERT INTO materials (uuid, course_uuid, name, description, type, content) VALUES (?, ?, ?, ?, 'url', ?)",
            [uuid, req.params.courseUuid, name, description, url]
        );
        res.status(201).json({ uuid, name, type: 'url' });
    } catch (err) {
        res.status(400).json({ error: "Invalid data" });
    }
});

// 4. Smazání materiálu (včetně fyzického souboru)
materialRoutes.delete("/:uuid", async (req, res) => {
    try {
        const [rows]: any = await pool.execute("SELECT * FROM materials WHERE uuid = ?", [req.params.uuid]);
        if (rows.length === 0) return res.status(404).json({ error: "Not found" });

        const material = rows[0];
        
        // Pokud je to soubor, smažeme ho z disku
        if (material.type === 'file') {
            const filePath = path.join('uploads', material.content);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await pool.execute("DELETE FROM materials WHERE uuid = ?", [req.params.uuid]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});