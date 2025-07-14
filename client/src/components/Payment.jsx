import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '../api/paymentAPI';

// Load Stripe.js as a side effect (only once)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  // Create payment intent when component mounts
  useState(() => {
    const createIntent = async () => {
      try {
        const data = await createPaymentIntent(amount);
        setClientSecret(data.clientSecret);
      } catch (err) {
        onError('Failed to initialize payment');
      }
    };
    
    if (amount > 0) {
      createIntent();
    }
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              // Add customer details here if available
            },
          }
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      setError('Payment processing failed');
      console.error('Payment error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border rounded-lg p-4 bg-white">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || processing || !clientSecret}
        className={`w-full py-3 px-4 rounded-md font-medium text-white ${
          processing || !stripe 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
      
      <div className="text-xs text-gray-500 mt-2">
        Test Card: 4242 4242 4242 4242 | Exp: Any future date | CVC: Any 3 digits
      </div>
    </form>
  );
};

const Payment = ({ amount, onSuccess, onError }) => {
  if (!amount || amount <= 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p>Invalid payment amount</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Secure Payment</h3>
        <p className="text-gray-600 mb-6">
          Your payment is securely processed by Stripe. We never store your card details.
        </p>
        
        <Elements stripe={stripePromise}>
          <PaymentForm 
            amount={amount} 
            onSuccess={onSuccess} 
            onError={onError} 
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;