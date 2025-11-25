import axios from 'axios';
import React, { useState } from 'react'
import api from '../Api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [ form, setfrom ] = useState({name:"",email:"",password:""});
    const navigate = useNavigate(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(api.userSignUp,form);
            toast.success(res.data.message);
            setfrom({name:"",email:"",password:""});
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message ||"Something went Wrong(SignUp Error)");
            
        }
    }

  return (
    <>
     <div className='container mt-5 w-50 rounded-5 shadow-lg p-5'>
        <h3>SignUp</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Name</label>
            <input onChange={(e)=>setfrom({...form,name:e.target.value})} value={form.name} className='form-control' required placeholder='Enter Name' type="text" /> <br />
            <label htmlFor="">Email</label>
            <input onChange={(e)=>setfrom({...form,email:e.target.value})} value={form.email} className='form-control' required placeholder='Enter Email' type="Email" /> <br />
            <label htmlFor="">Password</label>
            <input onChange={(e)=>setfrom({...form,password:e.target.value})} value={form.password} className='form-control' required placeholder='Enter Paasword' type="password" /> <br />
            
            <div className='text-center mt-3'>
                <button className='btn btn-primary' type="submit">Create</button>
              <br /> <span>Have an account? <Link to="/login">Login</Link></span>
             </div>
          
        </form>
        </div> 
    </>
  )
}

export default SignUp
