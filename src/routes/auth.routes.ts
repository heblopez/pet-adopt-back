import { Router } from 'express';
import { authUser } from '../controllers/user.controller';

const authRouter = Router();

authRouter.post('/auth', authUser);

export default authRouter;
