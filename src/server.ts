import 'reflect-metadata';
import app from './app';
import { serverInstance, normalizePort } from './utilities';
import variables from './variables';


const port = normalizePort(variables.app.port);

const server = serverInstance(port, "Sam's unsplash app!", app);

export default server;
