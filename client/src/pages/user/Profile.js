import React from 'react';
import Layout from '../../components/Layouts/Layout';
import UserMenu from '../../components/Layouts/UserMenu';

const Profile = () => {
  return (
    <Layout title={"User Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Your Profile</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile
