import { PrismaClient, type User } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserIfNotExists = async (user: User): Promise<User> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = await prisma.user.create({
      data: user
    });

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  }
};
