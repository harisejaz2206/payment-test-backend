import { createPaypalOrderHandler } from "./paypalSmartButton.controller";
const express = require("express");
const router = express.Router();

router.post("/create-paypal-order", createPaypalOrderHandler);

export default router;
