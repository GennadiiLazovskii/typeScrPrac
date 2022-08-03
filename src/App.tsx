import React, { useContext } from 'react';
import { ModalContext } from './components/context/ModalContext';
import CreateProduct from './components/CreateProduct/CreateProduct';
import ErrorProduct from './components/Error/ErrorProduct';
import useProductsApi from './components/hooks/productsApi';
import Loading from './components/Loading/Loading';
import Modal from './components/Modal/Modal';
import Product from './components/Product/Product';
import { Iproduct } from './Model/model';

function App() {

  const { products, loading, error, addProduct } = useProductsApi();
  const { modal, open, close } = useContext(ModalContext);

  const createHandler = (product: Iproduct) => {
    close();
    addProduct(product);
  }

  return (
    <div className='container mx-auto max-w-2xl pt-5'>

      {loading && <Loading />}
      {error && <ErrorProduct />}
      {products.map(product => <Product key={product.id} product={product} />)}

      {
        modal && <Modal title='Create New Product' onClose={() => close()}>
          <CreateProduct onCreate={createHandler} />
        </Modal>
      }

      <button className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'
      onClick={() => open()}
      >+</button>
    </div>
  );
}

export default App;
