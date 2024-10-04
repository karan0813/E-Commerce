import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
type ResponseData = {
  message: string;
};

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { amount } = req.body;

  const options = {
    amount: amount,
    currency: "INR",
    receipt: "order_" + Date.now(),
  };

  try {
    const order: any = await razorpay.orders.create(options);
    return res.status(200).json({ order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res.status(500).json({ error: "Error creating order" });
  }
}
