import { BadRequestError } from "@src/common/errors";
import { ImageStore } from "./unsplash.interface";
import { addImageRepo, deleteImageRepo, fetchImagesRepo, findImagesRepo, searchImagesByLabel } from "./unsplash.repository";



export const addImageService = async (data: Partial<ImageStore>): Promise<ImageStore> => {
    const newImage = await addImageRepo(data);
    return newImage;
  };
  
  export const fetchImageService = async (): Promise<ImageStore[]> => {
    const images = await fetchImagesRepo();
    return images;
  };

  export const searchImageService = async (query:string, page: number, perPage: number ): Promise<ImageStore[]> => {
    const images = await searchImagesByLabel(query);
    return images;
  };
  
  export const deleteImageService = async (id: string) => {
    const findImage = await findImagesRepo({ id });
    if (!findImage) {
      throw new BadRequestError('Image not found');
    }
    const deletedImage = await deleteImageRepo({id});
    return deletedImage;
  };