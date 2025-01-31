import React from 'react'

import { STRINGS } from '../lib/constants/strings'

type CategoriesProps = {
    categories: string[];
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
};

export default function Categories({ categories, selectedCategory, setSelectedCategory }: CategoriesProps) {
    console.log("selectedCategory", selectedCategory)
    return (
        <>
            <h2 className="text-lg font-bold mb-4">{STRINGS.CATEGORIES.CATEGORIES_LABEL}</h2>
            <ul className='space-y-2'>
                <li>
                    <a
                        className={`block px-4 py-2 cursor-pointer`}
                        onClick={() => setSelectedCategory(null)}
                    ><span className={`text-black ${selectedCategory === null
                        ? "font-bold" // Active state (font bold)
                        : "hover:font-bold font-normal" // Default state
                        }`}>{STRINGS.CATEGORIES.ALL_PRODUCTS_LABEL}</span></a>
                </li>
                {
                    categories.map((category) => (
                        <li key={category}>
                            <a className={`block px-4 py-2 cursor-pointer`}
                                onClick={() => setSelectedCategory(category)}>
                                <span className={`text-black ${selectedCategory === category
                                    ? "font-bold" // Active state (font bold)
                                    : "hover:font-bold font-normal" // Default state
                                    }`}>
                                    {category}
                                </span>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
