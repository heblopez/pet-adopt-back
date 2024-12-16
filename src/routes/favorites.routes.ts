import { Router } from 'express';
import {
  getFavorites,
  newFavorite,
  removeFavorite
} from '../controllers/favorites.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const favoritesRouter = Router();

favoritesRouter.post('/favorites/:petId', authMiddleware, newFavorite);
favoritesRouter.delete('/favorites/:petId', authMiddleware, removeFavorite);
favoritesRouter.get('/favorites', authMiddleware, getFavorites);

export default favoritesRouter;
