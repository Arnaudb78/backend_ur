import { Router } from "express";
import {
    checkIfUserIsOnTheGarden,
    findAllGardens,
    findGardenById,
    findGardenByUser,
    joinGarden,
    leaveGarden,
    register,
} from "../controllers/gardenController";

const router = Router();

router.post("/register", register);
router.get("/:accessToken", findGardenByUser);
router.get("/", findAllGardens);
router.post("/get", findGardenById);
router.post("/join", joinGarden);
router.post("/check", checkIfUserIsOnTheGarden);
router.put("/leave", leaveGarden);

export default router;
