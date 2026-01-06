import { Router } from "express";
import { pool } from "../db/index.js";
// @ts-ignore
import { v4 as uuidv4 } from "uuid"; 

export const courseRoutes = Router();

// 1. Získání všech kurzů
courseRoutes.get("/", async (req: any, res: any) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM courses");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// 2. Vytvoření kurzu
courseRoutes.post("/", async (req: any, res: any) => {
    const { name, description } = req.body;
    const uuid = uuidv4(); 

    try {
        await pool.execute(
            "INSERT INTO courses (uuid, name, description) VALUES (?, ?, ?)",
            [uuid, name, description]
        );
        res.status(201).json({ uuid, name, description });
    } catch (err) {
        res.status(500).json({ error: "Failed to create course" });
    }
});

// 3. Detail kurzu (UPRAVENO PRO FÁZI 2)
// Bot vyžaduje, aby detail kurzu obsahoval i pole s materiály
courseRoutes.get("/:uuid", async (req: any, res: any) => {
    try {
        // Získáme data kurzu
        const [courseRows]: any = await pool.execute("SELECT * FROM courses WHERE uuid = ?", [req.params.uuid]);
        
        if (courseRows.length === 0) {
            return res.status(404).json({ error: "Not found" });
        }

        // Získáme materiály patřící k tomuto kurzu (seřazené od nejnovějších)
        const [materialRows]: any = await pool.execute(
            "SELECT * FROM materials WHERE course_uuid = ? ORDER BY created_at DESC", 
            [req.params.uuid]
        );

        const course = courseRows[0];
        // Přidáme pole materials do objektu kurzu, aby testy prošly
        course.materials = materialRows;

        res.json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 4. Update kurzu
courseRoutes.put("/:uuid", async (req: any, res: any) => {
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
courseRoutes.delete("/:uuid", async (req: any, res: any) => {
    try {
        // Díky ON DELETE CASCADE v databázi se smažou i materiály automaticky
        await pool.execute("DELETE FROM courses WHERE uuid = ?", [req.params.uuid]);
        res.status(204).send(); 
    } catch (err) {
        res.status(500).json({ error: "Failed to delete" });
    }
});