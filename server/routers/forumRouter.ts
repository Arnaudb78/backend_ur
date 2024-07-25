import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/categoryController";
import { createThread, getAllThreadByCategory, getThreadById } from "../controllers/threadController";
import { createPost, getAllPostByThread } from "../controllers/postController";


const router = Router();

router.get("/category", getAllCategories);
router.post("/category", createCategory);
router.get("/thread/:id", getAllThreadByCategory);
router.post("/thread", createThread);
router.get("/threadId/:id", getThreadById);
router.get("/post/:id", getAllPostByThread);
router.post("/post", createPost);

export default router;