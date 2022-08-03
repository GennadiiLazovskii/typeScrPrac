import axios from 'axios';
import React, { useState } from 'react';
import { Iproduct } from '../../Model/model';

const productDate: Iproduct = {
    title: '',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
        rate: 23,
        count: 10
    }
}

interface CreateProductProps {
    onCreate: (product: Iproduct) => void;
}

export default function CreateProduct({ onCreate }: CreateProductProps) {

    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('')

        if (value.trim().length === 0) {
            setError('Please enter valid title')
            return
        }

        productDate.title = value;
        const response = await axios.post<Iproduct>('https://fakestoreapi.com/products', productDate);

        onCreate(response.data);
    }

    const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                className='border py-2 px-4 mb-2 w-full outline-0'
                type="text"
                placeholder='Enter product title...'
                value={value}
                onChange={changeHandler}
            />

            {error && <p className='text-center bg-red-500'>{error}</p>}

            <button type='submit' className='py-2 px-4 border bg-yellow-400 hover:text-white'>Create</button>
        </form>
    )
}
