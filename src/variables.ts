import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.NODE_ENV;

const variables = {
  app: {
    port: process.env.PORT || "3210",
    environment,
    deletePassword: process.env.DEFAULT_PASSWORD,
    baseRouter: process.env.BASE_ROUTER
  },

  logs: {
    showAppLogs: process.env.SHOW_APPLICATION_LOGS === 'true',
    databaseLogs: process.env.SHOW_DATABASE_LOGS === 'true'
  },
};

export default variables;
