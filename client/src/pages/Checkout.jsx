import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/Payment';
import { useCart } from '../context/CartContext';
import { createPaymentIntent } from '../api/paymentAPI';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { cartTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const createIntent = async () => {
      try {
        const data = await createPaymentIntent(cartTotal);
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.error || 'Failed to initialize payment');
        console.error('Payment error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (cartTotal > 0) {
      createIntent();
    } else {
      navigate('/cart');
    }
  }, [cartTotal, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Initializing payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {clientSecret && (
        <Elements 
          stripe={stripePromise} 
          options={{ clientSecret }}
        >
          <PaymentForm totalAmount={cartTotal} />
        </Elements>
      )}
    </div>
  );
}