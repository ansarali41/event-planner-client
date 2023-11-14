'use client';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalContext } from '../context/context';

const LoginPage = () => {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const { authUser, setAuthUser } = useGlobalContext();

    // useEffect(() => {
    //     if (!authUser.isLoggedIn) {
    //         router.push('/login');
    //     } else {
    //         router.push('/dashboard');
    //     }
    // }, [authUser, router]);

    const notify = () => toast.error('Invalid Credentials');

    const handleLoginForm = async evt => {
        evt.preventDefault();
        setErrors(errors => ({ ...validateCredentials(credentials) }));

        try {
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
                }
            }
        } catch (error) {
            notify();
            throw error.message;
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
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLoginForm.bind(this)}>
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
                                        id="password"
                                        className={
                                            'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' +
                                            (errors.hasOwnProperty('password') ? 'border-red-500' : '')
                                        }
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={credentials.password}
                                        onChange={handleInputChange.bind(this)}
                                    />
                                    {errors.hasOwnProperty('password') && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required=""
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{' '}
                                    <Link href="/registration" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Sign up
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

export default LoginPage;
