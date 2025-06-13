import { Router } from "express";
import BlogController from "../controllers/blog.js";
const router = Router();

router.post("/blogs", BlogController.createBlog);
router.get("/blogs", BlogController.getBlogs);
router.get("/blogs/:id", BlogController.getBlogbyId);
router.put("/blogs/:id", BlogController.updateBlog);
router.delete("/blogs/:id", BlogController.deleteBlog);

export default router;