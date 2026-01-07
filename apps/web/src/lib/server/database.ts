import mysql from 'mysql2/promise';

// Konfigurace přímo zde, aby se předešlo chybám s importy
export const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    password: 'password', // doplň své heslo
    database: 'tda_app',
});

export const db = {
    course: {
        findUnique: async ({ where }: { where: { uuid: string } }) => {
            const [rows]: any = await pool.execute(
                "SELECT * FROM courses WHERE uuid = ?",
                [where.uuid]
            );
            return rows[0] || null;
        },
        findMany: async () => {
            const [rows] = await pool.execute("SELECT * FROM courses");
            return rows;
        }
    },
    material: {
        findMany: async ({ where }: { where: { course_uuid: string } }) => {
            const [rows] = await pool.execute(
                "SELECT * FROM materials WHERE course_uuid = ? ORDER BY created_at DESC",
                [where.course_uuid]
            );
            return rows;
        },
        create: async ({ data }: any) => {
            const { uuid, course_uuid, name, description, type, content, mime_type } = data;
            return await pool.execute(
                `INSERT INTO materials (uuid, course_uuid, name, description, type, content, mime_type) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [uuid, course_uuid, name, description, type, content, mime_type || null]
            );
        }
    }
};