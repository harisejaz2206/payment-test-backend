import {
  processStripePaymentHandler,
  processPaypalPaymentHandler,
  processStripeSubscriptionHandler,
} from "./payment.controller";

const express = require("express");
const router = express.Router();

// Define API routes
router.post("/process-stripe-payment", processStripePaymentHandler);

router.post("/process-paypal-payment", processPaypalPaymentHandler);

router.post("/process-stripe-subscription", processStripeSubscriptionHandler);

export default router;
