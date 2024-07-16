"use client";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

const style = { layout: "vertical" };

const ButtonWrapper = ({ currency, showSpinner, amount, paymentSuccess }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner"></div>}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderId) => orderId)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            console.log(response);
            if (response.status === "COMPLETED") {
              paymentSuccess();
            }
          })
        }
      ></PayPalButtons>
    </>
  );
};

const Paypal = ({ amount, currency, paymentSuccess }) => {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          components: "buttons",
          currency: currency,
        }}
      >
        <ButtonWrapper
          showSpinner={false}
          amount={amount}
          currency={currency}
          paymentSuccess={paymentSuccess}
        ></ButtonWrapper>
      </PayPalScriptProvider>
    </div>
  );
};

export default Paypal;
