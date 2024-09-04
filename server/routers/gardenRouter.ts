import { Router } from 'express';
import { findAllGardens, findGardenByUser, register } from '../controllers/gardenController';

const router = Router();

router.post('/register', register);
router.get('/:accessToken', findGardenByUser);
router.get('/', findAllGardens);

export default router;