import { BadRequestError } from '@src/common/errors';
import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ImageStore } from './unsplash.interface';
import { addImageService, deleteImageService, fetchImageService, searchImageService } from './unsplash.service';

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
      const storedImages = await fetchImageService();
      respond(res, storedImages, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  searchImages: (): RequestHandler => async (req, res, next) => {
    try {
      const { queryString } = req.query as Record<string, string>;
      const storedImages = await searchImageService(queryString)
      respond(res, storedImages, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  deleteImage: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = req.query as Record<string, string>;
      const { password } = req.body
      if (password !== "samsam"){
        throw new BadRequestError("Invalid password provided")
      }
      
      await deleteImageService(id)
      respond(res, "Image deleted successfully", StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default unsplashController;
