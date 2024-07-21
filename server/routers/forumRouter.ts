import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/categoryController";
import { createThread, getAllThreadByCategory } from "../controllers/threadController";
import { createPost } from "../controllers/postController";


const router = Router();

router.get("/category", getAllCategories);
router.post("/category", createCategory);
router.get("/thread", getAllThreadByCategory);
router.post("/thread", createThread);
router.post("/post", createPost);

export default router;