import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ImageStore } from './unsplash.interface';
import { addImageService, deleteImageService, fetchImageService } from './unsplash.service';

const unsplashController = {
  addImage: (): RequestHandler => async (req, res, next) => {
    try {
      const image: Partial<ImageStore> = req.body;
      const storedImage = await addImageService(image)
      respond(res, storedImage, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  fetchImages: (): RequestHandler => async (req, res, next) => {
    try {
      const storedImages = await fetchImageService()
      respond(res, storedImages, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  deleteImages: (): RequestHandler => async (req, res, next) => {
    try {
      const {imageId} = req.query.id as Record<string, string>;
      
      const deleteImage = await deleteImageService(imageId)
    } catch (error) {
      next(error);
    }
  }
};

export default unsplashController;
