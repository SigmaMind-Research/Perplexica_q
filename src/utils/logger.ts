// import winston from 'winston';

// const logger = winston.createLogger({
//   level: 'info',
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple(),
//       ),
//     }),
//     new winston.transports.File({
//       filename: 'app.log',
//       format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json(),
//       ),
//     }),
//   ],
// });

// export default logger;






import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: 'azure-openai-app.log', // Changed file name for Azure-specific logs
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});

// Custom log methods for Azure-specific logs
logger.azureError = (message: string, errorDetails?: any) => {
  logger.error(`Azure OpenAI Error: ${message}`, {
    error: errorDetails,
    timestamp: new Date().toISOString(),
  });
};

logger.azureSuccess = (message: string) => {
  logger.info(`Azure OpenAI Success: ${message}`, {
    timestamp: new Date().toISOString(),
  });
};

logger.azureConfigLoaded = () => {
  logger.info('Azure OpenAI Configuration Loaded Successfully', {
    timestamp: new Date().toISOString(),
  });
};

logger.azureConfigError = (message: string) => {
  logger.error(`Azure OpenAI Configuration Error: ${message}`, {
    timestamp: new Date().toISOString(),
  });
};

export default logger;
