import { Router } from "express";
import { register, login, deleteAccount, verify, getInformations } from "../controllers/userController";
const router = Router();

router.post("/", getInformations);
router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.delete("/delete", deleteAccount);

export default router;
