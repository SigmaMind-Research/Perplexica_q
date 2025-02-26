import express from 'express';
import imagesRouter from './images';
import videosRouter from './videos';
import configRouter from './config';
import modelsRouter from './models';
import suggestionsRouter from './suggestions';
import chatsRouter from './chats';
import searchRouter from './search';
import discoverRouter from './discover';
import rateLimiter from '../utils/rateLimit';
import apipaymentRoutes from './apipayment';
import apiRoutes from './apikey';
import subscriptionRoutes from './subscription';


const router = express.Router();

router.use('/images', imagesRouter);
router.use('/videos', videosRouter);
router.use('/config', configRouter);
router.use('/models', modelsRouter);
router.use('/suggestions', suggestionsRouter);
router.use('/chats', chatsRouter);
router.use('/search', rateLimiter,searchRouter);
router.use('/discover', discoverRouter);
router.use('/subscription', subscriptionRoutes);
router.use('/api-payment', apipaymentRoutes);
router.use('/api-key', apiRoutes);

export default router;
