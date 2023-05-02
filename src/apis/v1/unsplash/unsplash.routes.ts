import { Router } from 'express';
import { addImageSchema, deleteImageSchema } from './imageStore.schema';
import unsplashController from './unsplash.controller';

const unsplashRouter = Router();

unsplashRouter.get('/', unsplashController.fetchImages());
unsplashRouter.post('/', addImageSchema, unsplashController.addImage());
unsplashRouter.delete('/', deleteImageSchema, unsplashController.deleteImage())

export default unsplashRouter;
