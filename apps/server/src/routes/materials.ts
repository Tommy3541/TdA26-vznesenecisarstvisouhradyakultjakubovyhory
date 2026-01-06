import { Router } from "express";
import { pool } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";
import fs from "fs";

export const materialRoutes = Router({ mergeParams: true });

// --- KONFIGURACE MULTERU (Povinné pro Fázi 2) ---
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

// --- ENDPOINTY ---

// 1. GET /courses/:courseUuid/materials
materialRoutes.get("/", async (req: any, res: any) => {
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

// 2. POST /courses/:courseUuid/materials
materialRoutes.post("/", (req: any, res: any) => {
    upload.single('file')(req, res, async (err: any) => {
        if (err) return res.status(400).json({ error: err.message });

        const { name, description, url } = req.body;
        const { courseUuid } = req.params;
        const uuid = uuidv4();

        try {
            if (req.file) {
                await pool.execute(
                    "INSERT INTO materials (uuid, course_uuid, name, description, type, content, mime_type) VALUES (?, ?, ?, ?, 'file', ?, ?)",
                    [uuid, courseUuid, name, description, req.file.filename, req.file.mimetype]
                );
                return res.status(201).json({ uuid, name, type: 'file' });
            } else if (url) {
                await pool.execute(
                    "INSERT INTO materials (uuid, course_uuid, name, description, type, content) VALUES (?, ?, ?, ?, 'url', ?)",
                    [uuid, courseUuid, name, description, url]
                );
                return res.status(201).json({ uuid, name, type: 'url' });
            }
            res.status(400).json({ error: "No file or URL" });
        } catch (dbErr) {
            res.status(500).json({ error: "Database error" });
        }
    });
});

// 3. PUT /courses/:courseUuid/materials/:materialUuid (Aktualizace)
materialRoutes.put("/:materialUuid", async (req: any, res: any) => {
    const { name, description, url } = req.body;
    try {
        if (url) {
            await pool.execute(
                "UPDATE materials SET name = ?, description = ?, content = ? WHERE uuid = ?",
                [name, description, url, req.params.materialUuid]
            );
        } else {
            await pool.execute(
                "UPDATE materials SET name = ?, description = ? WHERE uuid = ?",
                [name, description, req.params.materialUuid]
            );
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
});

// 4. DELETE /courses/:courseUuid/materials/:materialUuid (Smazání)
materialRoutes.delete("/:materialUuid", async (req: any, res: any) => {
    try {
        const [rows]: any = await pool.execute("SELECT * FROM materials WHERE uuid = ?", [req.params.materialUuid]);
        if (rows.length === 0) return res.status(404).json({ error: "Not found" });

        const material = rows[0];
        if (material.type === 'file') {
            const filePath = path.join('uploads', material.content);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await pool.execute("DELETE FROM materials WHERE uuid = ?", [req.params.materialUuid]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});