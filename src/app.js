import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog.js";
import authRouter from "./routes/auth.js";
const app = express();
app.use(express.json()); // Phân tích dữ liệu JSON
// Kết nối db
mongoose.connect(`mongodb://localhost:27017/nodejsThayDat`);

// routers
app.use("/api", blogRouter);
app.use("/api", authRouter);
export const viteNodeApp = app;
