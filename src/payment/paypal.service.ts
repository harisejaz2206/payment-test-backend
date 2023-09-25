import paypal from "paypal-rest-sdk";

// Define your PayPal interface here
interface PaypalPayment {
  id: string;
  intent: string;
  state: string;
  payer: any;
  transactions: any[];
  links?: { href: string; rel: string; method: string }[];
}

paypal.configure({
  mode: "sandbox",
  client_id:
    "AbIyKwWWHQ9k6h9DtOT51HOgltwcGN_rGwaCls4rVGVeC_n8MKV92D3bcq3q6yUHn16z9i2Vbfn1u37k",
  client_secret:
    "EP1JL0-prBEAJqxMhZ-QWu1pcJGr94eJWxeOKfTnhCT7X_CrdEKngABKQtjRqvWCpFwArFV2ceWuHozl",
});

export const processPaypalPayment = (amount: number) => {
  return new Promise<PaypalPayment>((resolve, reject) => {
    const paymentJson = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/failed",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: amount.toString(),
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: amount.toString(),
          },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.create(paymentJson, function (error, payment) {
      if (error) {
        reject(error);
      } else {
        if ("links" in payment) {
          resolve(payment as PaypalPayment); // casting to PaypalPayment type
        } else {
          reject(new Error("Payment does not contain links."));
        }
      }
    });
  });
};
