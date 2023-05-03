import { Router } from 'express';
import { addImageSchema, deleteImageSchema, searchImageSchema } from './imageStore.schema';
import unsplashController from './unsplash.controller';

const unsplashRouter = Router();

unsplashRouter.get('/', unsplashController.fetchImages());
unsplashRouter.post('/', addImageSchema, unsplashController.addImage());
unsplashRouter.post('/search', searchImageSchema, unsplashController.searchImages());
unsplashRouter.delete('/', deleteImageSchema, unsplashController.deleteImage())

export default unsplashRouter;
