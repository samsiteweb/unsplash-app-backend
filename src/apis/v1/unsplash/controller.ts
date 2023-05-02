import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createRoleSrv, getAllRolesSrv } from './unsplash.service';

const unsplashController = {
  createRole: (): RequestHandler => async (req, res, next) => {
    try {
      const role = req.body.role;
      const createdRole = await createRoleSrv({ role });
      respond(res, createdRole, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  getAllRoles: (): RequestHandler => async (req, res, next) => {
    try {
      const allRoles = await getAllRolesSrv();
      respond(res, allRoles, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default unsplashController;
