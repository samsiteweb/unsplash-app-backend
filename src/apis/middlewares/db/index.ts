import { PrismaClient } from '@prisma/client';
import storePrismaMiddleware from './store.prisma.middleware';
import userPrismaMiddleware from './user.prisma.middleware';

const prisma = new PrismaClient();

const databaseMiddleware = () =>
  prisma.$use(async (params, next) => {
    storePrismaMiddleware(params);
    userPrismaMiddleware(params);
    return next(params);
  });

databaseMiddleware();

export default prisma;
