// stripeCheckout.service.ts

import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51NqDB7FUtqiloGGLs9bOBAxQ7DhMMt9SSAhEd1Sf2V6PjmsH81vtgTEdfPd5RiGrPOPztfQs7DFIUYk0yaSPIDUV00cdqoxqvt",
  {
    apiVersion: "2023-08-16",
  }
);

export const createCheckoutSession = async (planId: string) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/failed",
    });

    return session.id;
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    throw new Error(error.message);
  }
};

export const createPortalSession = async (customerId: string) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: "http://localhost:3000/plans", // the return URL after managing the billing
  });
  return session.url;
};
