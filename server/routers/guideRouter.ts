import { Router } from "express";
import { createGuide, getAllGuides, getGuideById } from "../controllers/guideController";

const router = Router();

router.post("/post", createGuide);
router.get("/", getAllGuides);
router.get("/:id", getGuideById);

export default router;
