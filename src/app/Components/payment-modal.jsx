import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import CheckoutForm from '@/app/Components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { useGlobalContext } from '../context/context';
import { useEffect } from 'react';
import { useCallback } from 'react';

const stripePromise = loadStripe('pk_test_51Ha1hsEGLbU7xdvfaEFs0QLW43c6o73yJ7HXHlkOQkWGoBNu6qBnhLwluQOErLRpcv2NS8mTOnalPENDGoOEdG3V00YHX2mT5u');

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PaymentModal({ amount, eventId }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { authUser, setAuthUser } = useGlobalContext();

    // payment
    const [clientSecret, setClientSecret] = useState(null);
    const fetchData = useCallback(async () => {
        try {
            if (amount) {
                const { data } = await axios.get(`http://localhost:4000/payment/${amount}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authUser.accessToken,
                    },
                });

                setClientSecret(data.clientSecret);
            }
        } catch (error) {
            console.error(error.message);
        }
    }, [authUser.accessToken, amount]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    console.log('payments sc::', clientSecret);

    return (
        <div>
            <button
                onClick={handleOpen}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Join Now
            </button>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {clientSecret && (
                            <Elements stripe={stripePromise}>
                                <CheckoutForm clientSecret={clientSecret} amount={amount} eventId={eventId} />
                            </Elements>
                        )}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
