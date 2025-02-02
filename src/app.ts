import { startWebSocketServer } from './websocket';
import express from 'express';
import cors from 'cors';
import http from 'http';
import routes from './routes';
import { getPort } from './config';
import logger from './utils/logger';

const port = getPort();

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: ['https://thepotatoai.com', 'http://localhost:3000'],
  // methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  // allowedHeaders: ['X-Requested-With', 'Content-Type'],
  // credentials: true, // If using cookies or authentication
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // Handle preflight
// Custom CORS Middleware (Overrides cors package if needed)
app.use(express.json());

app.use('/api', routes);
app.get('/api', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

startWebSocketServer(server);

process.on('uncaughtException', (err, origin) => {
  logger.error(`Uncaught Exception at ${origin}: ${err}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});
