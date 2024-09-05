import { Router } from "express";
import { findAllGardens, findGardenById, findGardenByUser, joinGarden, register } from "../controllers/gardenController";

const router = Router();

router.post("/register", register);
router.get("/:accessToken", findGardenByUser);
router.get("/", findAllGardens);
router.post("/get", findGardenById);
router.post("/join", joinGarden);

export default router;
