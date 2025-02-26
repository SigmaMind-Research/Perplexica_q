// routes/apipayment.ts
import express, { Request, Response } from 'express';
import Razorpay from 'razorpay';
import { v4 as uuidv4 } from "uuid";
// import { supabase } from '../config/supabase';
import crypto from 'crypto';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'rzp_test_5fCROkV0QkMat9',
  // process.env.RAZORPAY_KEY_ID || '',
  key_secret: 'VgFMHZ0ytjntlxew34BDPCVf'
  // process.env.RAZORPAY_KEY_SECRET || '',
});


// 🟢 Route to Create Order
router.post("/create-order", async (req: Request, res: Response) => {
    try {
      const { amount, userId } = req.body;
  
      // Ensure the amount is a multiple of $5
      if (amount < 5) {
        res
          .status(400)
          .json({ message: "Minimum $5 in multiples of 5 only." });
      }
  
      // Create Razorpay order
      const orderOptions = {
        amount: amount * 100, // Razorpay accepts in paise (cents)
        currency: "USD",
        receipt: uuidv4(),
        payment_capture: 1,
      };
  
      const order = await razorpay.orders.create(orderOptions);
      // update the order with supabase and update the plan first
  
      // Return the order ID and Razorpay checkout info
      res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
// 🟢 Route to Verify Payment
router.post("/verify-payment", async (req: Request, res: Response) => {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;
  
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_payment_id + "|" + razorpay_order_id)
      .digest("hex");
  
    if (generated_signature === razorpay_signature) {
      res.status(200).json({ message: "Payment verified successfully." });
    } else {
      res.status(400).json({ message: "Invalid payment signature." });
    }
  });
  
  export default router;