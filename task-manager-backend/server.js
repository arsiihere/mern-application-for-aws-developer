const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

let corsOptions = {
  origin: ["http://localhost:5173"],
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
