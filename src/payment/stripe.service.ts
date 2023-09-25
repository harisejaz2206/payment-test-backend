import Stripe from "stripe";

// Create a PaymentIntent and confirm it
export const processPayment = async (
  amount: number,
  paymentMethodId: string,
  description: string,
  metaData?: Record<string, any> | undefined
) => {
  try {
    console.log(
      "PaymentIntent",
      "sk_test_51NqDB7FUtqiloGGLs9bOBAxQ7DhMMt9SSAhEd1Sf2V6PjmsH81vtgTEdfPd5RiGrPOPztfQs7DFIUYk0yaSPIDUV00cdqoxqvt"
    );
    const stripe = new Stripe(
      "sk_test_51NqDB7FUtqiloGGLs9bOBAxQ7DhMMt9SSAhEd1Sf2V6PjmsH81vtgTEdfPd5RiGrPOPztfQs7DFIUYk0yaSPIDUV00cdqoxqvt"!,
      {
        apiVersion: "2023-08-16",
      }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      description,
      payment_method: paymentMethodId,
      confirm: true,
    });

    return paymentIntent;
  } catch (error) {
    throw error;
  }
};

export const createSubscription = async (
  customerId: string,
  paymentMethodId: string,
  priceId: string = "price_1NrbFIFUtqiloGGL8XD2sMT0"
) => {
  try {
    console.log("Starting service method"); // Debug line to ensure function is called

    const stripe = new Stripe(
      "sk_test_51NqDB7FUtqiloGGLs9bOBAxQ7DhMMt9SSAhEd1Sf2V6PjmsH81vtgTEdfPd5RiGrPOPztfQs7DFIUYk0yaSPIDUV00cdqoxqvt", // Your Stripe secret key
      {
        apiVersion: "2023-08-16",
      }
    );

    console.log("Stripe object created"); // Debug line

    // Attach the payment method to the customer
    const attachResult = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    console.log("stripe.paymentMethods.attach successful", attachResult); // Debug line

    // Update the customer's default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ["latest_invoice.payment_intent"],
    });

    console.log("Subscription created:", subscription);

    return subscription;
  } catch (error) {
    console.log("An error occurred:", error); // This will log any errors that occur during execution
  }
};
