const { processPayment } = require("./stripe.service");
import { Request, Response } from "express"; // Make sure to import Request and Response from 'express' if you're using Express.js
import { processPaypalPayment } from "./paypal.service";
import { createSubscription } from "./stripe.service";

// Example:
export const processStripePaymentHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const paymentIntent = await processPayment(
      req.body.amount,
      req.body.paymentMethodId,
      req.body.description,
      req.body.metadata
    );

    res.status(200).json({
      statusCode: 200,
      status: 200,
      message: "Success",
      payload: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: error.message,
    });
  }
};

export const processStripeSubscriptionHandler = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(
      `Received customerId: ${req.body.customerId}, paymentMethodId: ${req.body.paymentMethodId}`
    );
    console.log("going inside await createSubscription");

    const subscription = await createSubscription(
      req.body.customerId,
      req.body.paymentMethodId
    );

    console.log("outside await createSubscription now");

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "Subscription Success",
      payload: {
        subscriptionId: subscription.id,
      },
    });
  } catch (error) {
    console.error(
      `Error in processStripeSubscriptionHandler: ${error.message}`
    );
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: error.message,
    });
  }
};

export const processPaypalPaymentHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const amount = req.body.amount; // Make sure to validate this
    const payment = await processPaypalPayment(amount);

    // Redirect the user to PayPal for the payment
    for (let link of payment.links) {
      if (link.rel === "approval_url") {
        res.status(200).json({
          url: link.href,
        });
        return;
      }
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: error.message,
    });
  }
};
