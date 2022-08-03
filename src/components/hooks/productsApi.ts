import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Iproduct } from '../../Model/model';


const useProductsApi = () => {
    const [products, setProducts] = useState<Iproduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function addProduct(product: Iproduct) {
        setProducts(prev => [...prev, product]);
    }

    async function fetchProducts() {

        try {
            setError('')
            setLoading(true);
            const response = await axios.get<Iproduct[]>('https://fakestoreapi.com/products?limit=5');
            setProducts(response.data);
            setLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setLoading(false);
            setError(error.message);
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return {products, loading, error, addProduct};
}

export default useProductsApi;