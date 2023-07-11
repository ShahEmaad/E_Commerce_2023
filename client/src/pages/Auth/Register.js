import React, {useState} from 'react';
import Layout from '../../components/Layouts/Layout.js';
import AuthStyles from '../../styles/AuthStyles.css';

import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");

    const navigate = useNavigate();

    //Form Function
    const handleSubmit = async (e) => {
        //Prevent Page Refresh
        e.preventDefault();
        try {
            // Api Request
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                {name,email,password,address,phone}
            );
            if(res.data && res.data.success){
                toast.success(res.data && res.data.message);
                navigate('/login');
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        console.log(process.env.REACT_APP_API);
        
    }

  return (
    <Layout title="Register - ECommerce App">
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
        <h1 class = 'title'>REGISTER FORM</h1>
        <div className="mb-3">
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="exampleInputName1"
            placeholder='Enter your Name'
            required
            />
        </div>
        <div className="mb-3">
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder='Enter your Email'
            required
            />
        </div>
        <div className="mb-3">
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder='Enter your Password'
            required
            />
        </div>
        <div className="mb-3">
            <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            id="exampleInputPhone1"
            placeholder='Enter your Phone Number'
            required
            />
        </div>
        <div className="mb-3">
            <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            id="exampleInputAddress1"
            placeholder='Enter your Address'
            required
            />
        </div>
        
        <button type="submit" className="btn btn-primary">
            REGISTER
        </button>
        </form>

      </div>   
    </Layout>
  )
}

export default Register;
