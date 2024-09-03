import { Router } from 'express';
import { findGardenByUser, register } from '../controllers/gardenController';

const router = Router();

router.post('/register', register);
router.get('/:accessToken', findGardenByUser);

export default router;