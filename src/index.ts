// src/index.ts
import express from "express";
import cors from "cors";
import paymentRouter from "./payment/payment.route";
import checkoutRouter from "./stripe-checkout/stripeCheckout.route";
import smartButtonRouter from "./paypal-smart-button/paypalSmartButton.route";

const app = express();
const port = 7979;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// stripe
app.use("/payment", paymentRouter);

app.use("/checkout-session", checkoutRouter);

app.use("/paypal", smartButtonRouter);

// app.use("/payment", paymentRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
