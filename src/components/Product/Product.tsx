import React, { useState } from "react";
import { Iproduct } from "../../Model/model";

interface ProductProps {
    product: Iproduct
}

const Product = ({ product }: ProductProps) => {

    const [details, setDetails] = useState(false);

    const btnBgClassName = details ? 'bg-yellow-400' : 'bg-blue-400';
    const btnClasses = ['py-2 px-4 border', btnBgClassName];

    return (
        <div className='border py-2 rounded flex flex-col items-center mb-2'>
            <img src={product.image} alt={product.title} className='w-1/6' />
            <p>{product.title}</p>
            <p className="font-bold">{product.price}</p>
            <button className={btnClasses.join(' ')}
                onClick={() => setDetails(prev => !prev)}
            >{details ? 'Hide Details' : 'Show Details'}</button>
            {
                details && <div>
                    <p>{product.description}</p>
                    <p className="text-center my-2">Rate: <span className="font-bold">{product?.rating?.rate}</span></p>
                </div>
            }
        </div>
    );
}

export default Product;