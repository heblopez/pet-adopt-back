import { Router } from 'express';
import { listAvailablePets } from '../controllers/pets.controller';

const petsRouter = Router();

petsRouter.get('/pets', listAvailablePets);

export default petsRouter;
