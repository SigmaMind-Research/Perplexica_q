// // routes/subscription.ts
// import express, { Request, Response } from 'express';
// import Razorpay from 'razorpay';
// // import { supabase } from '../config/supabase';
// import crypto from 'crypto';

// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: 'rzp_test_5fCROkV0QkMat9',
//   // process.env.RAZORPAY_KEY_ID || '',
//   key_secret: 'VgFMHZ0ytjntlxew34BDPCVf'
//   // process.env.RAZORPAY_KEY_SECRET || '',
// });

// interface CreateSubscriptionRequest extends Request {
//     body: {
//       planId: string;
//       userId: string;
//     };
//   }
  
//   // Fetch all plans
// router.get('/plans', async (req: Request, res: Response) => {
//   try {
//     const response = await razorpay.plans.all();
//     res.json(response);
//   } catch (error) {
//     console.error('Error fetching Razorpay plans:', error);
//     res.status(500).json({ error: 'Failed to fetch plans from Razorpay' });
//   }
// });

//   router.post('/create', async (req: Request, res: Response) => {
//     try {
//       const { planId, userId } = req.body;
//       console.log(req.body);
//       if (!planId || !userId) {
//         res.status(400).json({ error: 'Missing planId or userId' });
//         return;
//       }
  
//       const subscription = await razorpay.subscriptions.create({
//         plan_id: planId,
//         total_count: 12,
//         customer_notify: 1,
//       });
  
//     //   const { error } = await supabase
//         // .from('subscriptions')
//         // .insert([{ user_id: userId, subscription_id: subscription.id, status: subscription.status }]);
// //   
//     //   if (error) throw error;
  
//       res.status(200).json({ subscription });
//     } catch (err) {
//       res.status(500).json({ error: (err as Error).message });
//     }
//   });
  
// // Handle subscription webhook
// router.post(
//     '/webhook',
//     express.raw({ type: 'application/json' }), // Middleware to ensure raw body
//     async (req: Request, res: Response): Promise<void> => {
//       try {
//         const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
//         const signature = req.headers['x-razorpay-signature'] as string;
//         const body = req.body as Buffer; // Express raw gives Buffer type
  
//         // Compute HMAC signature
//         const expectedSignature = crypto.createHmac('sha256', webhookSecret)
//         // .update(body)
//         .update(body as unknown as crypto.BinaryLike)

//         .digest('hex');
  
//         if (expectedSignature !== signature) {
//           res.status(400).json({ error: 'Invalid signature' });
//           return;
//         }
  
//         // Parse the event body
//         const event: {
//           event: string;
//           payload: {
//             subscription: {
//               entity: { id: string };
//             };
//           };
//         } = JSON.parse(body.toString());
  
//         // Handle subscription event
//         if (event.event === 'subscription.charged') {
//           const subscriptionId = event.payload.subscription.entity.id;
  
//         //   const { error } = await supabase
//             // .from('subscriptions')
//             // .update({ status: 'active' })
//             // .eq('subscription_id', subscriptionId);
// //   
//         //   if (error) {
//             // res.status(500).json({ error: error.message });
//             // return;
//         //   }
  
//           res.status(200).json({ message: 'Subscription updated' });
//         } else {
//           res.status(400).json({ error: 'Unhandled event type' });
//         }
//       } catch (err) {
//         res.status(500).json({ error: (err as Error).message });
//       }
//     }
//   );
  
// export default router;
