import { Router } from "express";
import { register, login, deleteAccount, verify, getInformations, findUserById } from "../controllers/userController";
const router = Router();

router.get("/:accessToken", getInformations);
router.get("/:id", findUserById);
router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.delete("/delete", deleteAccount);

export default router;
