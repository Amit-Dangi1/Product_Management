import { useState, useContext } from "react";
 import axios from "axios";
import api from "../Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
//   const { login } = useContext(AuthContext);
  const [form, setform] = useState({email:"",password:""});
  const navigate = useNavigate(null);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
        let res = await axios.post(api.userLogin,form);
        toast.success(res.data.message);
        setform({email:"",password:""})
        navigate("/productlist")

        localStorage.setItem("token",res.data.token);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message ||"Something went wrong(Login page)");  
        
    }
  };

  return (
    
    <div className="container w-50 rounded-5 mt-5 p-5 shadow-lg">
      <h2 className="mb-2">Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Email</label>
        <input className="form-control" placeholder="Email" value={form.email} onChange={(e) => setform({...form,email:e.target.value})} required />
<br />  
<label htmlFor="">Password</label>
<input className="form-control" placeholder="Password" type="password" value={form.password} onChange={(e) => setform({...form,password:e.target.value})} required />
        <div className="text-center mt-3">
        <button className="btn btn-primary" type="submit">Login</button><br />
        <span>not have account? <Link to="/signup">SignUp</Link></span></div>
      </form>
    </div>
  );
}

