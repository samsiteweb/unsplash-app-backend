import { BadRequestError } from '@src/common/errors';
import { generatePaginationMeta, respond } from '@src/utilities';
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
      const images = await fetchImageService();
      respond(res, images, StatusCodes.OK, null);
    } catch (error) {
      next(error);
    }
  },

  searchImages: (): RequestHandler => async (req, res, next) => {
    try {
      const query = req.query as Record<string, string>;

      const page = query.page ? parseInt(query.page) : 1;
      const perPage = query.perPage ? parseInt(query.perPage) : 10

      const images = await searchImageService(query.queryString, page, perPage);
      const response = generatePaginationMeta(images, page, perPage)

      respond(res, response.data,  StatusCodes.OK, null, response.meta);
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
