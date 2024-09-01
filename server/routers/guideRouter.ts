import { Router } from "express";
import { createGuide, getAllGuides } from "../controllers/guideController";

const router = Router();

router.post("/post", createGuide);
router.get("/", getAllGuides);

export default router;