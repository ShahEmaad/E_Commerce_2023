import React from 'react'
import Layout from '../../components/Layouts/Layout';
import UserMenu from '../../components/Layouts/UserMenu';

const Orders = () => {
  return (
    <Layout title={"User Orders"}>
      <div className="container-fluid m-3 p-3 dashboard">
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Your Orders</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders
