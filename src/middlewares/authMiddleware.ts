import { verifyToken } from '@clerk/express';
import type { NextFunction, Request, Response } from 'express';

export interface AuthRequest extends Request {
  auth?: {
    userId: string;
    sessionId: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const options = {
      jwtKey: process.env.CLERK_JWT_KEY
    };
    const session = await verifyToken(token, options);
    if (!session) {
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.auth = {
      userId: session.sub,
      sessionId: session.sid
    };

    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    res.status(401).json({ error: 'Unauthorized: Token verification failed' });
  }
};
