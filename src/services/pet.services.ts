import { type Pet, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAvailablePets = async (): Promise<Pet[]> => {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        isAvailable: true
      },
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true
          }
        }
      }
    });

    return pets;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching available pets');
  }
};

export const createNewPet = async (pet: Pet): Promise<Pet> => {
  try {
    const newPet = await prisma.pet.create({
      data: pet
    });

    return newPet;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating new pet');
  }
};

export const getMyPets = async (userId: string): Promise<Pet[]> => {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        ownerId: userId
      },
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true
          }
        }
      }
    });

    return pets;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching my pets');
  }
};
