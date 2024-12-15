import { requireAuth } from '@clerk/clerk-sdk-node';
import type { NextFunction, Request, Response } from 'express';

interface AuthRequest extends Request {
  auth: {
    userId: string;
    sessionId: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    requireAuth((handlerReq, _handlerRes) => {
      req.auth = handlerReq.auth;
      next();
    })(req, res);
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
