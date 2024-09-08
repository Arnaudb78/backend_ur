import e, {Router} from "express";
import {findAddressById} from "../controllers/addressController";

const router = Router();

router.get("/:id", findAddressById);

export default router;