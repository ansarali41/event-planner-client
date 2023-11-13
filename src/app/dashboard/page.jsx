'use client';
import isAuth from '../Utils/Auth/IsAuth';

const Dashboard = () => {
    return (
        <main className=" h-screen flex justify-center items-center">
            <p>Dashboard</p>
        </main>
    );
};

export default isAuth(Dashboard);
