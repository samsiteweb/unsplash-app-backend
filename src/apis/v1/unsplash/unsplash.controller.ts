import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const unsplashController = {
  addImage: (): RequestHandler => async (req, res, next) => {
    try {
      const role = req.body.role;
      
      // respond(res, createdRole, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  fetchImages: (): RequestHandler => async (req, res, next) => {
    try {
      const role = req.body.role;
      
      // respond(res, createdRole, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  deleteImages: (): RequestHandler => async (req, res, next) => {
    try {
  
    } catch (error) {
      next(error);
    }
  }
};

export default unsplashController;
