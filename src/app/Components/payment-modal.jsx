import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/app/Components/CheckoutForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/context';

const stripePromise = loadStripe('pk_test_51Ha1hsEGLbU7xdvfaEFs0QLW43c6o73yJ7HXHlkOQkWGoBNu6qBnhLwluQOErLRpcv2NS8mTOnalPENDGoOEdG3V00YHX2mT5u');

function MyVerticallyCenteredModal({ clientSecret, amount }) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="w-1/2 ">
                    {clientSecret && (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm clientSecret={clientSecret} amount={amount} />
                        </Elements>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const PaymentModal = ({ totalAmount }) => {
    const [modalShow, setModalShow] = useState(false);
    const { authUser, setAuthUser } = useGlobalContext();

    // payment
    const [clientSecret, setClientSecret] = useState(null);
    useEffect(() => {
        // Fetch the payment intent client secret from your backend
        const fetchData = async () => {
            try {
                console.log('totalAmount', totalAmount);
                if (totalAmount) {
                    const { data } = await axios.get(`http://localhost:4000/payment/${totalAmount}`, {
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
        };

        fetchData();
    }, [authUser.accessToken, totalAmount]);

    console.log('clientSecret', clientSecret);
    return (
        <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Pay Now
            </Button>

            <MyVerticallyCenteredModal show={modalShow} clientSecret={clientSecret} amount={amount} onHide={() => setModalShow(false)} />
        </div>
    );
};

export default PaymentModal;
