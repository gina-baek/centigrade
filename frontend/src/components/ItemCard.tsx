import React from 'react'

import { STRINGS } from '../lib/constants/strings';

type ItemCardProps = {
    id: number;
    title: string;
    price: number;
    image: string;
};

export default function ItemCard({ id, title, price, image }: ItemCardProps) {
    return (
        <div key={id} className="border border-gray-300 rounded-md flex flex-col h-full justify-center">
            <img src={image} alt={title} className='w-full h-48 object-contain rounded-md p-4 mb-4' />
            <h2 className='p-1 line-clamp-3'>{title}</h2>
            <p className='p-1'>${price}</p>
            {/* Pushes button to the bottom */}
            <div className="flex-grow"></div>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>{STRINGS.ITEM_CARD.ADD_TO_CART_BUTTON}</button>
        </div>
    )
}
