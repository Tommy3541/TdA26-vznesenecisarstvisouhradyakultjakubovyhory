import { pool } from "./index.js";
export async function initDatabase() {
    try {
        console.log("Initializing database schema...");

        // Tabulka pro uživatele 
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // TABULKA PRO KURZY 
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS courses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                uuid VARCHAR(36) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                description TEXT
            )
        `);

        console.log("Database schema initialized successfully!");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}
