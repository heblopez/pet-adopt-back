import { Router } from 'express';
import {
  listAvailablePets,
  listMyPets,
  registerPet
} from '../controllers/pets.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const petsRouter = Router();

petsRouter.get('/pets', listAvailablePets);
petsRouter.post('/pets', authMiddleware, registerPet);
petsRouter.get('/pets/my-pets', authMiddleware, listMyPets);

export default petsRouter;
