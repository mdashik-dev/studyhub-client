import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { api } from "../../contexts/AuthProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import useBookedSession from "../../hooks/useBookedSession";

const Payment = () => {
  const [clientSecret, setClientSecret] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const { user } = useUser();
  const { data, error } = useBookedSession(id);

  const navigate = useNavigate();

  const {
    data: session,
    isLoading: sessionLoading,
    isError: sessionError,
  } = useQuery({
    queryKey: ["sessionDetails"],
    queryFn: async () => {
      const response = await api.get(`/api/tutor/get-session/${id}`);
      return response.data;
    },
    retry: 2,
    enabled: !!id,
  });

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (session?.fee) {
        Swal.fire({
          title: "Processing Payment",
          text: "Please wait while we set up your payment...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        try {
          const response = await api.post("/api/payment/payment-intent", {
            amount: session?.fee * 100,
          });

          if (response.data.client_secret) {
            setClientSecret(response.data.client_secret);
            Swal.close();
          } else {
            Swal.fire("Error", "Failed to retrieve client secret.", "error");
          }
        } catch (error) {
          console.error("Error creating payment intent:", error.message);
          Swal.fire(
            "Error",
            "An error occurred while setting up payment.",
            "error"
          );
        }
      }
    };

    createPaymentIntent();
  }, [session]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      Swal.fire("Error", "Stripe is not loaded properly.", "error");
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      Swal.fire("Error", "Please provide your card details.", "error");
      return;
    }

    Swal.fire({
      title: "Processing Payment",
      text: "Please wait while we process your payment...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const { error: confirmPaymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.name,
              email: user?.email,
            },
          },
        });

      if (confirmPaymentError) {
        Swal.fire("Payment Failed", confirmPaymentError.message, "error");
      } else if (paymentIntent.status === "succeeded") {
        const response = await api.post("/api/booksession", {
          sessionId: session?._id,
          userId: user?._id,
          paymentDetails: paymentIntent,
        });

        if (response.status === 201) {
          Swal.fire(
            "Payment Successful",
            "Your payment was processed successfully.",
            "success"
          );
          navigate("/dashboard/student");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error.message);
      Swal.fire(
        "Error",
        error?.response?.data?.error ||
          "An error occurred while processing the payment.",
        "error"
      );
    }
  };

  if (sessionLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Loading session details...</p>
      </div>
    );
  }

  if (sessionError) {
    Swal.fire("Error", "Failed to load session details.", "error");
    return null;
  }

  if (data?.isBooked === true) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h3 className="text-lg text-green-600">This session already booked</h3>
        <Link to="/dashboard/student" className="underline mt-1">
          View
        </Link>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[600px] p-6 shadow-lg rounded-lg"
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="bg-indigo-600 disabled:bg-indigo-300 text-white w-full px-4 py-2 rounded-md mt-4"
          >
            Pay
          </button>
        </form>
      </div>
    );
  }
};

export default Payment;
