import { Router } from 'express';
import { addImageSchema, deleteImageSchema, searchImageSchema } from './imageStore.schema';
import unsplashController from './unsplash.controller';

const unsplashRouter = Router();

unsplashRouter.get('/', unsplashController.fetchImages());
unsplashRouter.post('/', addImageSchema, unsplashController.addImage());
unsplashRouter.get('/search', searchImageSchema, unsplashController.searchImages());
unsplashRouter.delete('/:id', deleteImageSchema, unsplashController.deleteImage())

export default unsplashRouter;
