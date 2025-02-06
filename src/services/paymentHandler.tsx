import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
// import axios from "axios";
import toast from "react-hot-toast";

const PaystackPaymentHandler = ({
  amount,
  email,
  postId,
  onSuccess,
}: {
  amount: number;
  email: string;
  postId: string;
  onSuccess: (response: any) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const publicKey = process.env.REACT_APP_PAYSTACK_KEY!;

  // const handlePaystackSuccessAction = async (reference: any) => {
  //   try {
  //     setLoading(true);
  //     // Verify payment server-side
  //     console.log("reference -->", reference);
  //     const response: any = await axios.post("/api/verify-payment", {
  //       reference: reference.reference,
  //       postId: postId,
  //     });

  //     if (response.data.status === "success") {
  //       onSuccess(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Payment verification failed", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const componentProps = {
    email,
    amount: amount * 100,
    publicKey,
    text: "Make Payment",
    onSuccess,
    onClose: () => toast.error("Payment closed"),
  };

  // console.log("components -->", componentProps);

  return (
    <div>
      {loading ? (
        <div>Processing payment...</div>
      ) : (
        <PaystackButton {...componentProps} />
      )}
    </div>
  );
};

export default PaystackPaymentHandler;
