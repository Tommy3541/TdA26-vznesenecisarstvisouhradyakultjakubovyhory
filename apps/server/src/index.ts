import "dotenv/config";
import cors from "cors";
import express from "express";
import { initDatabase } from "./db/init.js";
import { userRoutes } from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());

// API router
const apiRoutes = express.Router();

// hlavní endpoint /api → vrací JSON podle zadání
apiRoutes.get("/", (_req, res) => {
  res.json({ organization: "Student Cyber Games" });
});

// další routy (např. /api/users)
apiRoutes.use("/users", userRoutes);

// připojení routeru pod /api
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;

async function start() {
  await initDatabase();
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
  });
}

start();
