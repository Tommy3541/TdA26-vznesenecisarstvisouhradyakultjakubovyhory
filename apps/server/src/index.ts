import "dotenv/config";
import cors from "cors";
import express from "express";
import { initDatabase } from "./db/init.js";
import { userRoutes } from "./routes/users.js";
import { courseRoutes } from "./routes/courses.js"

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API router
const apiRoutes = express.Router();

// ✅ Výstup podle zadání Tour de App
apiRoutes.get("/", (_req, res) => {
    res.json({ organization: "Student Cyber Games" });
});

// Další endpointy
apiRoutes.use("/users", userRoutes);

apiRoutes.use("/courses", courseRoutes);

// Registrace routeru
app.use("/api", apiRoutes);

// ✅ Retry logika pro čekání na databázi
async function waitForDatabase() {
    let connected = false;
    while (!connected) {
        try {
            await initDatabase();
            connected = true;
            console.log("✅ Database schema initialized successfully!");
        } catch (err: any) {
            console.error("⏳ Waiting for DB...", err.message);
            await new Promise((res) => setTimeout(res, 2000));
        }
    }
}

// Spuštění serveru
async function start() {
    await waitForDatabase();
    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
}

start();
