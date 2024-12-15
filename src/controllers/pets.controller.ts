import type { Pet } from '@prisma/client';
import type { Request, Response } from 'express';
import type { AuthRequest } from '../middlewares/authMiddleware';
import { createNewPet, getAvailablePets } from '../services/pet.services';

export const listAvailablePets = async (_req: Request, res: Response) => {
  try {
    const pets = await getAvailablePets();

    res.status(200).json({
      message: 'Available pets retrieved successfully!',
      data: pets
    });
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

export const registerPet = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.auth) {
      throw new Error('Auth not found');
    }

    const { userId } = req.auth;

    if (!userId) {
      throw new Error('User ID not found');
    }

    const dataNewPet = req.body as Pet;
    dataNewPet.ownerId = userId;

    const newPet = await createNewPet(dataNewPet);

    res.status(200).json({
      data: newPet,
      message: 'Pet registered successfully!'
    });
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};
