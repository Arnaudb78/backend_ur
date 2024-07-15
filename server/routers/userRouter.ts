import { Router } from 'express';
import { register, login, deleteAccount } from '../controllers/userController';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete', deleteAccount);

export default router;