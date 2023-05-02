import { Router } from 'express';
import { addImageSchema } from '../../schemas/imageStore.schema';
import unsplashController from './controller';

const roleRouter = Router();

roleRouter.post('/', addImageSchema, unsplashController.createRole());

export default roleRouter;
