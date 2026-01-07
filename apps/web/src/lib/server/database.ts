import { pool } from "./index.js";

export const db = {
    course: {
        // Najde kurz podle UUID (které používáš v URL)
        findUnique: async ({ where }: { where: { uuid: string } }) => {
            const [rows]: any = await pool.execute(
                "SELECT * FROM courses WHERE uuid = ?",
                [where.uuid]
            );
            return rows[0] || null;
        },
        // Seznam všech kurzů pro stránku /courses
        findMany: async () => {
            const [rows] = await pool.execute("SELECT * FROM courses");
            return rows;
        }
    },
    material: {
        // Najde materiály patřící ke konkrétnímu kurzu
        findMany: async ({ where }: { where: { course_uuid: string } }) => {
            const [rows] = await pool.execute(
                "SELECT * FROM materials WHERE course_uuid = ? ORDER BY created_at DESC",
                [where.course_uuid]
            );
            return rows;
        },
        // Vytvoří nový materiál (soubor nebo odkaz)
        create: async ({ data }: any) => {
            const { uuid, course_uuid, name, description, type, content, mime_type } = data;
            
            // Tady používáme přesně ty názvy sloupců z tvého initDatabase (uuid, course_uuid, name atd.)
            return await pool.execute(
                `INSERT INTO materials (uuid, course_uuid, name, description, type, content, mime_type) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [uuid, course_uuid, name, description, type, content, mime_type || null]
            );
        }
    }
};