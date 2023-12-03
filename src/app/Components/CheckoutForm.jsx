// src/components/CheckoutForm.jsx

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ clientSecret, amount = 0 }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const cardStyle = {
        base: {
            backgroundColor: '#3498db',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            '::placeholder': {
                color: '#fff',
            },
        },
        invalid: {
            color: '#ff3860',
        },
    };

    const handlePayment = async () => {
        setIsProcessing(true);

        try {
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                setError(error.message);
                setIsProcessing(false);
            } else {
                // Payment successful, you can perform additional actions if needed
                console.log(paymentIntent);

                // Call the onSubmit function passed as a prop to handle form submission
                // onSubmit();
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setError('Error processing payment');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={e => e.preventDefault()} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <CardElement />
            </div>
            <button
                type="button"
                onClick={handlePayment}
                disabled={!stripe || isProcessing}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isProcessing && 'opacity-50 cursor-not-allowed'}`}
            >
                {isProcessing ? 'Processing...' : `Pay Now ${amount}`}
            </button>
            {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
    );
};

export default CheckoutForm;
