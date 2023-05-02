import { PrismaClient } from '@prisma/client';
import { ImageStore } from './unsplash.interface';

const prisma = new PrismaClient();

export const addImageRepo = async (data: Partial<ImageStore>): Promise<ImageStore> => {
  const newImage = await prisma.imageStore.create({
    data: {
      image_url: data.image_url,
      label: data.label
    }
  });
  return newImage;
};
export const findImagesRepo = async (filters: any): Promise<ImageStore> => {
  const image = await prisma.imageStore.findUnique({
    where: { ...filters }
  });
  return image;
};
export const fetchImagesRepo = async (filters: any): Promise<ImageStore[]> => {
  const images = await prisma.imageStore.findMany({
    where: { ...filters }
  });
  return images;
};
export const deleteImageRepo = async (filters: Partial<ImageStore>): Promise<ImageStore> => {
  const image = await prisma.imageStore.delete({
    where: { ...filters }
  });
  return image;
};
