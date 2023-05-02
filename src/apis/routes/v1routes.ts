
import { Router } from 'express';
import unsplashRouter from '../v1/unsplash/unsplash.routes';


const v1Router = Router();

v1Router.use('/store', unsplashRouter);


export default v1Router;
