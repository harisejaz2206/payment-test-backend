import { Request, Response } from "express";
import { createPaypalOrder } from "./paypalSmartButton.service";

export const createPaypalOrderHandler = async (req: Request, res: Response) => {
  try {
    const amount = req.body.amount; // Make sure to validate this
    const order = await createPaypalOrder(amount);
    res.status(200).json({
      orderID: order.id,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: error.message,
    });
  }
};
