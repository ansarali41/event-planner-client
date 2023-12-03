// src/components/CheckoutForm.jsx

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useGlobalContext } from '../context/context';
import { useRouter } from 'next/navigation';

const CheckoutForm = ({ clientSecret, amount = 0, eventId }) => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { authUser, setAuthUser } = useGlobalContext();

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
                if (paymentIntent.status === 'succeeded') {
                    setIsSuccess(true);

                    try {
                        const { data } = await axios.put(
                            `http://localhost:4000/event/payment/${eventId}`,
                            {
                                isPaid: true,
                                paidBy: authUser.user_id,
                                userEmail: authUser.email,
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: authUser.accessToken,
                                },
                            },
                        );
                        if (data) {
                            router.push('/purchased-events');
                        }
                    } catch (error) {
                        throw error.message;
                    }
                }

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
        <div>
            {isSuccess ? (
                <div>
                    <h1 className="text-green-600">Payment Success</h1>
                    <h1>Thank you! 🎉</h1>
                </div>
            ) : (
                <form onSubmit={e => e.preventDefault()} className="max-w-md mx-auto mt-8">
                    <h1 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">Payment</h1>

                    <div className="mb-4">
                        <CardElement />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handlePayment}
                            disabled={!stripe || isProcessing}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isProcessing && 'opacity-50 cursor-not-allowed'} `}
                        >
                            {isProcessing ? 'Processing...' : `Pay Now $${amount}`}
                        </button>
                    </div>

                    {error && <div className="mt-4 text-red-500">{error}</div>}
                </form>
            )}
        </div>
    );
};

export default CheckoutForm;
