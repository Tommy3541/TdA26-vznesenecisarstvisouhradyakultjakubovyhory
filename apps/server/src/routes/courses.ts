import { Router } from "express";
import { pool } from "../db/index.js";
import { v4 as uuidv4 } from "uuid"; 

export const courseRoutes = Router();

// 1. Získání všech kurzů
courseRoutes.get("/", async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM courses");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// 2. Vytvoření kurzu (Zde padal test POST)
courseRoutes.post("/", async (req, res) => {
    const { name, description } = req.body;
    const uuid = uuidv4(); // Bot vyžaduje UUID

    try {
        await pool.execute(
            "INSERT INTO courses (uuid, name, description) VALUES (?, ?, ?)",
            [uuid, name, description]
        );
        
        // Bot chce zpátky objekt vytvořeného kurzu
        res.status(201).json({ uuid, name, description });
    } catch (err) {
        res.status(500).json({ error: "Failed to create course" });
    }
});

// 3. Detail kurzu
courseRoutes.get("/:uuid", async (req, res) => {
    try {
        const [rows]: any = await pool.execute("SELECT * FROM courses WHERE uuid = ?", [req.params.uuid]);
        if (rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// 4. Update kurzu
courseRoutes.put("/:uuid", async (req, res) => {
    const { name, description } = req.body;
    try {
        await pool.execute(
            "UPDATE courses SET name = ?, description = ? WHERE uuid = ?",
            [name, description, req.params.uuid]
        );
        res.json({ uuid: req.params.uuid, name, description });
    } catch (err) {
        res.status(500).json({ error: "Failed to update" });
    }
});

// 5. Smazání kurzu
courseRoutes.delete("/:uuid", async (req, res) => {
    try {
        await pool.execute("DELETE FROM courses WHERE uuid = ?", [req.params.uuid]);
        res.status(204).send(); // 204 No Content je pro smazání standard
    } catch (err) {
        res.status(500).json({ error: "Failed to delete" });
    }
});