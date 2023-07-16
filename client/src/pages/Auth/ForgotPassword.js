import React, {useState} from 'react';
import Layout from '../../components/Layouts/Layout.js';
import AuthStyles from '../../styles/AuthStyles.css';

import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';


const ForgotPassword = () => {

    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [answer,setAnswer] = useState("");

    const navigate = useNavigate();

    //Form Function
    const handleSubmit = async (e) => {
        //Prevent Page Refresh
        e.preventDefault();
        try {
            // Api Request
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{
                    email,
                    newPassword,
                    answer
                }
            );
            if(res.data && res.data.success){
                toast.success(res.data && res.data.message);
                
                navigate( '/login');
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
    <Layout title={"Forgot Password - ECommerce App"}>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
        <h1 class = 'title'>RESET PASSWORD</h1>

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
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder='Enter your Password Reset Parameter'
            required
            />
        </div>
        <div className="mb-3">
            <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder='Enter your Password'
            required
            />
        </div>
        
        <button type="submit" className="btn btn-primary">
            RESET
        </button>
        </form>

      </div>
    </Layout>
  );
};

export default ForgotPassword;
