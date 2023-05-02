import { Router } from 'express';
import { addImageSchema } from '../../schemas/imageStore.schema';
import unsplashController from './unsplash.controller';

const unsplashRouter = Router();

unsplashRouter.post('/', addImageSchema, unsplashController.addImage());

export default unsplashRouter;
