import { BadRequestError } from '@src/common/errors';
import { respond } from '@src/utilities';
import variables from '@src/variables';
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
      const { page, perPage } = req.query as Record<string, string>;
      const images = await fetchImageService(page ? parseInt(page) : 1, perPage ? parseInt(perPage) : 10);
      respond(res, images, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  searchImages: (): RequestHandler => async (req, res, next) => {
    try {
      const { queryString, page, perPage } = req.query as Record<string, string>;
      const images = await searchImageService(queryString, page ? parseInt(page) : 1, perPage ? parseInt(perPage) : 10);
      respond(res, images, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  deleteImage: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = req.query as Record<string, string>;
      const { password } = req.body
      if (password !== variables.app.deletePassword) {
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
