import { Router } from 'express';
import { listAvailablePets, registerPet } from '../controllers/pets.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const petsRouter = Router();

petsRouter.get('/pets', listAvailablePets);
petsRouter.post('/pets', authMiddleware, registerPet);

export default petsRouter;
