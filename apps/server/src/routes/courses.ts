import { Router } from "express";
import { pool } from "../db/index.js";

export const courseRoutes = Router();

// GET /courses - Seznam
courseRoutes.get("/", async (_req, res) => {
    const [rows] = await pool.execute("SELECT * FROM courses");
    res.json(rows);
});

// POST /courses - Vytvoření
courseRoutes.post("/", async (req, res) => {
    const { name, description } = req.body;
    const [result]: any = await pool.execute(
        "INSERT INTO courses (name, description) VALUES (?, ?)",
        [name || "Nový kurz", description || ""]
    );
    res.status(201).json({ id: result.insertId, name, description });
});

// GET /courses/:id - Detail
courseRoutes.get("/:id", async (req, res) => {
    const [rows]: any = await pool.execute("SELECT * FROM courses WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
});

// PUT /courses/:id - Úprava
courseRoutes.put("/:id", async (req, res) => {
    const { name, description } = req.body;
    await pool.execute(
        "UPDATE courses SET name = ?, description = ? WHERE id = ?",
        [name, description, req.params.id]
    );
    res.json({ id: req.params.id, name, description });
});

// DELETE /courses/:id - Smazání
courseRoutes.delete("/:id", async (req, res) => {
    await pool.execute("DELETE FROM courses WHERE id = ?", [req.params.id]);
    res.status(204).send(); // 204 znamená "No Content" - úspěšně smazáno
});