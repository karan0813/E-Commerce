"use client";

import { clearCart, removeFromCart } from "@/store/cartSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handlePayment = async () => {
    // First, make a call to your backend to create an order
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: cart.total * 100, // Razorpay expects amount in paise
      }),
    });

    const order = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: cart.total * 100,
      currency: "INR",
      name: "E-Shop",
      description: "Payment for your order",
      order_id: order.id,
      handler: function (response: any) {
        alert(
          "Payment Successful. Payment ID: " + response.razorpay_payment_id
        );
        dispatch(clearCart());
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (cart.items.length === 0) {
    return <div className="text-center text-gray-600">Your cart is empty.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-gray-600">
              Price: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => handleRemoveFromCart(item.id)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Total: ${cart.total.toFixed(2)}</h3>
        <button
          onClick={handlePayment}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
