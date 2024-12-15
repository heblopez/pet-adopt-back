import type { Request, Response } from 'express';
import { getAvailablePets } from '../services/pet.services';

export const listAvailablePets = async (_req: Request, res: Response) => {
  try {
    const pets = await getAvailablePets();

    res.status(200).json({
      message: 'Available pets retrieved successfully',
      data: pets
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving available pets',
      error
    });
  }
};
