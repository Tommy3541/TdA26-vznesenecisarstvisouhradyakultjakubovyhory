import "dotenv/config";
import cors from "cors";
import express from "express";
import { initDatabase } from "./db/init.js";
import { userRoutes } from "./routes/users.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API router
const apiRoutes = express.Router();

//  Opravený výstup podle zadání
apiRoutes.get("/", (_req, res) => {
    res.json({ organization: "Student Cyber Games" });
});

// Další endpointy
apiRoutes.use("/users", userRoutes);

// Registrace routeru
app.use("/api", apiRoutes);

// Spuštění serveru
const port = process.env.PORT || 3000;
async function start() {
    await initDatabase();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

start();
