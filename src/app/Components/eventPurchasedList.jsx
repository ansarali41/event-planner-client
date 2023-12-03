import { useState } from 'react';
import { useGlobalContext } from '../context/context';

const EventPurchasedUser = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const { authUser, setAuthUser } = useGlobalContext();
    return (
        <div>
            <div className="p-8">
                <h1>Purchased Event by user</h1>

                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Event Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Event ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    User ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple
                                </th>
                                <td class="px-6 py-4">Silver</td>
                                <td class="px-6 py-4">Laptop</td>
                                <td class="px-6 py-4">Laptop</td>
                                <td class="px-6 py-4">$2999</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EventPurchasedUser;
