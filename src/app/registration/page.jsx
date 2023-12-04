'use client';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalContext } from '../context/context';

const Registration = () => {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ full_name: '', mobile: '', email: '', password: '', confirm_password: '' });
    const [errors, setErrors] = useState({});
    const { authUser, setAuthUser } = useGlobalContext();

    const notify = () => toast.error('Registration Failed!');
    const passwordNotMatch = () => toast.error('Password Not Match');
    const registrationSuccess = () => toast.success('Registration Successful');

    const handleLoginForm = async evt => {
        evt.preventDefault();
        setErrors(errors => ({ ...validateCredentials(credentials) }));
        if (credentials.password !== credentials.confirm_password) {
            passwordNotMatch();
            return null;
        } else {
            try {
                const response = await axios.post(
                    'http://localhost:4000/auth-user/register',
                    {
                        full_name: credentials.full_name,
                        mobile: credentials.mobile,
                        email: credentials.email,
                        password: credentials.password,
                        confirm_password: credentials.confirm_password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );

                if (response?.data) {
                    const { data } = await axios.post(
                        'http://localhost:4000/auth-user/login',
                        {
                            email: credentials.email,
                            password: credentials.password,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    );
                    if (data?.jwt) {
                        const tokenDetails = jwt.verify(data.jwt.toString(), '123456789'.toString('utf-8'));
                        if (tokenDetails?.user_id) {
                            setAuthUser({
                                user_id: tokenDetails.user_id,
                                email: tokenDetails.email,
                                isLoggedIn: true,
                                accessToken: data.jwt,
                            });
                            router.push('/dashboard');
                            registrationSuccess();
                        }
                    }
                }
            } catch (error) {
                notify();
                throw error.message;
            }
        }
    };

    const validateCredentials = credentials => {
        let errors = {};
        console.log('errors', errors);

        if (credentials.email.length < 5) {
            errors = Object.assign(errors, {
                email: 'This field is required',
            });
        }

        if (credentials.password.length < 5) {
            errors = Object.assign(errors, {
                password: 'This field is required',
            });
        }
        if (credentials.confirm_password.length < 5) {
            errors = Object.assign(errors, {
                confirm_password: 'This field is required',
            });
        }

        return errors;
    };

    const handleInputChange = evt => {
        evt.preventDefault();
        setCredentials(credentials => ({ ...credentials, [evt.target.name]: evt.target.value }));
    };
    return (
        <div>
            <ToastContainer />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image width={100} height={100} className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Event Planner
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an account</h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLoginForm.bind(this)}>
                                <div>
                                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Full Name
                                    </label>
                                    <input
                                        id="full_name"
                                        className={
                                            'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' +
                                            (errors.hasOwnProperty('full_name') ? 'border-red-500' : '')
                                        }
                                        name="full_name"
                                        type="text"
                                        placeholder="John Deo"
                                        value={credentials.full_name}
                                        onChange={handleInputChange.bind(this)}
                                    />
                                    {errors.hasOwnProperty('full_name') && <p className="text-red-500 text-xs italic">{errors.full_name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Mobile
                                    </label>
                                    <input
                                        id="mobile"
                                        className={
                                            'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' +
                                            (errors.hasOwnProperty('mobile') ? 'border-red-500' : '')
                                        }
                                        name="mobile"
                                        type="text"
                                        placeholder="+1 50 555 0199"
                                        value={credentials.mobile}
                                        onChange={handleInputChange.bind(this)}
                                    />
                                    {errors.hasOwnProperty('mobile') && <p className="text-red-500 text-xs italic">{errors.mobile}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <input
                                        id="email"
                                        className={
                                            'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' +
                                            (errors.hasOwnProperty('email') ? 'border-red-500' : '')
                                        }
                                        name="email"
                                        type="email"
                                        placeholder="abc@example.com"
                                        value={credentials.email}
                                        onChange={handleInputChange.bind(this)}
                                    />
                                    {errors.hasOwnProperty('email') && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className={
                                            'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' +
                                            (errors.hasOwnProperty('password') ? 'border-red-500' : '')
                                        }
                                        value={credentials.password}
                                        onChange={handleInputChange.bind(this)}
                                    />
                                    {errors.hasOwnProperty('password') && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className={
                                            'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' +
                                            (errors.hasOwnProperty('confirm_password') ? 'border-red-500' : '')
                                        }
                                        value={credentials.confirm_password}
                                        onChange={handleInputChange.bind(this)}
                                    />
                                    {errors.hasOwnProperty('confirm_password') && <p className="text-red-500 text-xs italic">{errors.confirm_password}</p>}
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                            I accept the{' '}
                                            <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Create an account
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{' '}
                                    <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Login here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Registration;
