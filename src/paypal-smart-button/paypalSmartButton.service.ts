import * as paypal from "paypal-rest-sdk"; // Use the proper import statement

interface PaypalOrder {
  id: string;
  intent: string;
  status: string;
  payer?: {
    email_address: string;
  };
  purchase_units: [
    {
      reference_id: string;
      amount: {
        currency_code: string;
        value: string;
      };
    }
  ];
  create_time?: string;
  update_time?: string;
  links?: {
    href: string;
    rel: string;
    method: string;
  }[];
}

paypal.configure({
  mode: "sandbox", // Sandbox or live
  client_id:
    "AbIyKwWWHQ9k6h9DtOT51HOgltwcGN_rGwaCls4rVGVeC_n8MKV92D3bcq3q6yUHn16z9i2Vbfn1u37k",
  client_secret:
    "EP1JL0-prBEAJqxMhZ-QWu1pcJGr94eJWxeOKfTnhCT7X_CrdEKngABKQtjRqvWCpFwArFV2ceWuHozl",
});

export const createPaypalOrder = (orderJson: any) => {
  return new Promise<PaypalOrder>((resolve, reject) => {
    paypal.payment.create(orderJson, function (error: any, payment: any) {
      if (error) {
        reject(error);
      } else {
        resolve(payment as PaypalOrder);
      }
    });
  });
};
