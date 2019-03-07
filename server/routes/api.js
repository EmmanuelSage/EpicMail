import express from 'express';
import user from '../controllers/user';

const router = express.Router();

router.post('/auth/signup', user.create);

export default router;
