import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/authMiddleware';
import {
  createFavorite,
  deleteFavorite,
  getFavoritesByUser
} from '../services/favorite.services';

export const newFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const { petId } = req.params;

    if (!req.auth) {
      throw new Error('Auth not found');
    }
    const { userId } = req.auth;

    if (!petId || !userId) {
      res.status(400).json({
        error: 'Pet ID and user ID are required'
      });
      return;
    }

    const favorite = await createFavorite({
      petId: Number(petId),
      userId: userId
    });

    res.status(200).json({
      message: 'Favorite created successfully!',
      data: favorite
    });
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

export const removeFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const { petId } = req.params;

    if (!req.auth) {
      throw new Error('Auth not found');
    }
    const { userId } = req.auth;

    if (!petId || !userId) {
      res.status(400).json({
        error: 'Pet ID and user ID are required'
      });
      return;
    }

    const favorite = await deleteFavorite(Number(petId));

    res.status(200).json({
      message: 'Favorite removed successfully!',
      data: favorite
    });
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

export const getFavorites = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.auth) {
      throw new Error('Auth not found');
    }
    const { userId } = req.auth;

    if (!userId) {
      res.status(400).json({
        error: 'User ID is required'
      });
      return;
    }

    const favorites = await getFavoritesByUser(userId);

    res.status(200).json({
      message: 'Favorites fetched successfully!',
      data: favorites
    });
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};
