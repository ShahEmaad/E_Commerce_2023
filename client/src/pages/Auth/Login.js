import React, {useState} from 'react';
import Layout from '../../components/Layouts/Layout.js';
import AuthStyles from '../../styles/AuthStyles.css';

import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

import { useAuth } from '../../context/auth.js';

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [auth,setAuth] = useAuth();

    const navigate = useNavigate();

    //Form Function
    const handleSubmit = async (e) => {
        //Prevent Page Refresh
        e.preventDefault();
        try {
            // Api Request
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                {email,password}
            );
            if(res.data && res.data.success){
                toast.success(res.data && res.data.message);
                //User Auth
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate('/');
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
        <h1 class = 'title'>LOGIN FORM</h1>

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
        
        <button type="submit" className="btn btn-primary">
            LOGIN
        </button>
        </form>

      </div>   
    </Layout>
  )
}

export default Login
