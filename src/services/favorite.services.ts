import { type Favorite, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createFavorite = async (
  favorite: Omit<Favorite, 'favoriteId' | 'createdAt'>
): Promise<Favorite> => {
  try {
    const newFavorite = await prisma.favorite.create({
      data: favorite,
      include: {
        pet: {
          include: {
            owner: true
          }
        }
      }
    });

    return newFavorite;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating favorite');
  }
};

export const deleteFavorite = async (
  petId: number,
  userId: string
): Promise<Favorite> => {
  try {
    const favorite = await prisma.favorite.delete({
      where: {
        petId_userId: {
          petId,
          userId
        }
      }
    });
    return favorite;
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting favorite');
  }
};

export const getFavoritesByUser = async (
  userId: string
): Promise<Favorite[]> => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId
      },
      include: {
        pet: {
          include: {
            owner: true
          }
        }
      }
    });

    return favorites;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching favorites');
  }
};
