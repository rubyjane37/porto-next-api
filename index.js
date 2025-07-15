import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();

// CORS Configuration - Production Ready
const allowedOrigins = [
  "http://localhost:3000",
  "https://natsrululum37.vercel.app",
  "https://porto-next-app.vercel.app",
  process.env.CORS_ORIGIN
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const normalizedOrigin = origin.replace(/\/$/, "");
      
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }
      
      // Log blocked origins for debugging
      console.log(`CORS blocked origin: ${origin}`);
      return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
  })
);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.get("/api/projects/featured", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM projects WHERE is_featured = TRUE ORDER BY id LIMIT 3"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error /api/projects/featured:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM projects ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Error /api/projects:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  }
});

app.get("/api/profile", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM profile LIMIT 1");
    res.json(rows[0] || {});
  } catch (err) {
    console.error("Error /api/profile:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  }
});

app.get("/api/experiences", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM experiences ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Error /api/experiences:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  }
});

app.get("/api/education", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM education ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Error /api/education:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      error: "Validation failed", 
      message: "Semua field wajib diisi." 
    });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: "Validation failed", 
      message: "Format email tidak valid." 
    });
  }
  
  try {
    await pool.query(
      "INSERT INTO contacts (name, email, subject, message, created_at) VALUES ($1, $2, $3, $4, NOW())",
      [name, email, subject, message]
    );
    res.status(201).json({ 
      success: true, 
      message: "Pesan berhasil dikirim." 
    });
  } catch (err) {
    console.error("Error /api/contact:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: process.env.NODE_ENV === 'development' ? err.message : 'Gagal mengirim pesan'
    });
  }
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ 
    error: "Not found", 
    message: `Route ${req.originalUrl} not found` 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: "Internal server error",
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
  });
}

// Export for Vercel Functions
export default app;
