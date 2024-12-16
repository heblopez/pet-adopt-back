import type { User } from '@prisma/client';
import type { Request, Response } from 'express';
import { createUserIfNotExists } from '../services/user.services';

export const authUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body as User;

    if (!userData.email || !userData.userId) {
      res.status(400).json({
        error: 'User data is incomplete, please provide email and userId'
      });
      return;
    }

    const user = await createUserIfNotExists(userData);

    res.status(200).json({
      message: 'User authenticated successfully!',
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error
    });
  }
};
