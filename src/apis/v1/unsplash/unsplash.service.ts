import { BadRequestError } from "@src/common/errors";
import { ImageStore } from "./unsplash.interface";
import { addImageRepo, deleteImageRepo, fetchImagesRepo, findImagesRepo, searchImagesByLabel } from "./unsplash.repository";



export const addImageService = async (data: Partial<ImageStore>): Promise<ImageStore> => {
    const newImage = await addImageRepo(data);
    return newImage;
  };
  
  export const fetchImageService = async (page: number = 1, perPage: number = 10): Promise<ImageStore[]> => {
    const skip = (page - 1) * perPage;
    const take = perPage;
    const images = await fetchImagesRepo({}, skip, take);
    return images;
  };

  export const searchImageService = async (query:string): Promise<ImageStore[]> => {
    const images = await searchImagesByLabel(query);
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