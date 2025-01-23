// // src/app.ts
// import express from 'express';
// import bodyParser from 'body-parser';
// import subscriptionRoutes from '../routes/subscription';
// import * as dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// // Middleware
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api/subscription', subscriptionRoutes);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
