import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ paymentIntentId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      await axios.post(
        "https://project-backend-cgtf.onrender.com/fees/payment/verify",
        { paymentIntentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("✅ Payment successful! Receipt sent to email.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

      <div className="border p-4 rounded-lg bg-gray-50">
        <PaymentElement />
      </div>

      <button
        disabled={!stripe || loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
      >
        {loading ? "Processing Payment..." : "💳 Pay Fees"}
      </button>

      {message && (
        <p className="text-green-600 font-medium text-center">
          {message}
        </p>
      )}

    </form>
  );
}

export default function StudentFeesPayment() {

  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const [fees, setFees] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paid, setPaid] = useState(false);

  const calculateFees = async () => {
    try {

      setErrorMessage("");
      setPaid(false);

      const res = await axios.post(
        "https://project-backend-cgtf.onrender.com/fees/calculate",
        {
          department,
          year: Number(year),
          semester: Number(semester),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFees(res.data);

    } catch (err) {

      const msg = err.response?.data?.message || "Error calculating fees";

      if (msg.includes("already paid")) {
        setPaid(true);
        setErrorMessage("✅ Fees already paid for this semester.");
      } else {
        setErrorMessage(msg);
      }

      setFees(null);
    }
  };

  const createPayment = async () => {

    if (paid) {
      setErrorMessage("Fees already paid for this semester.");
      return;
    }

    const res = await axios.post(
      "https://project-backend-cgtf.onrender.com/fees/payment/create",
      {
        department,
        year: Number(year),
        semester: Number(semester),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setClientSecret(res.data.clientSecret);
    setPaymentIntentId(res.data.paymentIntentId);
  };

  return (

    <div className="min-h-screen bg-green-50 p-6 md:p-10">

      <h1 className="text-3xl font-bold text-green-700 mb-8">
        💳 Student Fees Payment
      </h1>


      {/* Fee Input Form */}

      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">

        <div className="space-y-4">

          <input
            placeholder="Department"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <input
            placeholder="Year"
            type="number"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <input
            placeholder="Semester"
            type="number"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />

          <button
            onClick={calculateFees}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Calculate Fees
          </button>

        </div>

      </div>


      {/* Error Message */}

      {errorMessage && (
        <p className="mt-6 text-red-600 font-semibold">
          {errorMessage}
        </p>
      )}


      {/* Fee Breakdown */}

      {fees && !paid && (

        <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-xl">

          <h2 className="text-xl font-bold text-green-700 mb-4">
            📄 Fees Breakdown
          </h2>

          <div className="space-y-2 text-gray-700">

            <p>Tuition Fee: ₹{fees.breakdown.tuitionFee}</p>
            <p>Exam Fee: ₹{fees.breakdown.examFee}</p>
            <p>Other Fee: ₹{fees.breakdown.otherFee}</p>
            <p>Condonation Fee: ₹{fees.breakdown.condinationFee}</p>

          </div>

          <div className="mt-4 text-lg font-bold text-green-700">
            Total Amount: ₹{fees.totalAmount}
          </div>

          <button
            onClick={createPayment}
            className="mt-5 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
          >
            Proceed to Payment
          </button>

        </div>

      )}


      {/* Stripe Payment Section */}

      {clientSecret && !paid && (

        <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-xl">

          <h2 className="text-xl font-bold text-green-700 mb-4">
            🔐 Secure Payment
          </h2>

          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm paymentIntentId={paymentIntentId} />
          </Elements>

        </div>

      )}

    </div>

  );
}