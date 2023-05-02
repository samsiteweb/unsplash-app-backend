import { BadRequestError } from "@src/common/errors";
import { ImageStore } from "./unsplash.interface";
import { addImageRepo, deleteImageRepo, fetchImagesRepo, findImagesRepo } from "./unsplash.repository";



export const addImageService = async (data: Partial<ImageStore>): Promise<ImageStore> => {
    const newImage = await addImageRepo(data);
    return newImage;
  };
  
  export const fetchImageService = async (): Promise<ImageStore[]> => {
    const images = await fetchImagesRepo({});
    return images;
  };
  
  export const deleteImageService = async (id: string) => {
    const cartItem = await findImagesRepo({ id });
    if (!cartItem) {
      throw new BadRequestError('Cart item not found');
    }
    const deletedCart = await deleteImageRepo({id});
    return deletedCart;
  };