// stripeCheckout.controller.ts

import { Request, Response } from "express";
import {
  createCheckoutSession,
  createPortalSession,
} from "./stripeCheckout.service";

export const initiateCheckout = async (req: Request, res: Response) => {
  try {
    const sessionId = await createCheckoutSession(req.body.planId);
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Checkout session initiated successfully",
      payload: { sessionId },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Could not initiate checkout",
      payload: {},
    });
  }
};

export const createBillingPortalSession = async (
  req: Request,
  res: Response
) => {
  try {
    const portalSessionUrl = await createPortalSession(req.body.customerId);
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Billing portal session created successfully",
      payload: { url: portalSessionUrl },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Could not create billing portal session",
      payload: {},
    });
  }
};
