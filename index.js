import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const allowedOrigins = [
  process.env.CORS_ORIGIN?.replace(/\/$/, "") || "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // izinkan request tanpa origin (misal Postman)
      const normalizedOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

const port = process.env.PORT || 5000;
app.options("*", cors()); // handle preflight

app.use(express.json());

// Endpoint featured projects (ambil 3 data featured)
app.get("/projects/featured", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM projects WHERE is_featured = TRUE ORDER BY id LIMIT 3"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error /projects/featured:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoints
app.get("/projects", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM projects ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Error /projects:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM profile LIMIT 1");
    res.json(rows[0] || {});
  } catch (err) {
    console.error("Error /profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/experiences", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM experiences ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Error /experiences:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/education", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM education ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Error /education:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Semua field wajib diisi." });
  }
  try {
    await pool.query(
      "INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4)",
      [name, email, subject, message]
    );
    res.json({ success: true, message: "Pesan berhasil dikirim." });
  } catch (err) {
    console.error("Error /contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app;
