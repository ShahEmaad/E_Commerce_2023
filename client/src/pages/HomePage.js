import React from 'react';
import Layout from '../components/Layouts/Layout';
import { useAuth } from '../context/auth';

const HomePage = () => {
  const [auth,setAuth] = useAuth();

  return (
    <Layout title={'All Products - Best Offers'}>
        <div className='row'>
            <div className='col-md-3'>
                <h1 className='text-center'>Filter By Category</h1>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Products</h1>
            </div>
        </div>
    </Layout>
  )
}

export default HomePage
