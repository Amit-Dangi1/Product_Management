 import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../Api';
import { Link, useNavigate } from 'react-router-dom';
 
 const Product = () => {

    const [ data, setdata ] = useState([]);
    const [ form, setform ] = useState({name:"",price:"",category:"",inStock:""});
    const [ updateid, setupdateid ] = useState(null);
    let navigate = useNavigate(null);

    const getAll = async () => {
        try {
            let res = await axios.get(api.getAllProduct);
            setdata(res.data.product);
             
            console.log(data);
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    };

    const deleteData = async (id) => {
try {
    if(localStorage.getItem("token")){
        console.log("inside");
        
        let res = await axios.delete(`http://localhost:3000/product/${id}`,{
      withCredentials:true
    })
        toast.success(res.data.message || "deleted")
        getAll();
        setupdateid(null);
        setform({name:"",price:"",category:"",inStock:""});


console.log(localStorage.getItem("token"));


    }else{
     navigate("/login")
    }
} catch (error) {
 console.log(error);
    
}
    }

    const addProduct = async (e) => {
        try {
            e.preventDefault();
            if(localStorage.getItem("token")){
                if(form.price<0)toast.error("Negative Price not Allowed")
                if(updateid!=null){
                   let res = await axios.put(`${api.updateneProduct}/${updateid}`,form);
                   toast.success(res.data.message);
                   setupdateid(null)
                }else{
                let res = await axios.post(api.productCreate,form);
                toast.success(res.data.message);
                }
                setform({name:"",price:"",category:"",inStock:""});
                getAll();
            }else{
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setupdateid(null);
            
        }
    }
    
    const updateData = (id,index) => {
        if(localStorage.getItem("token")){
        setupdateid(id);
        setform(data[index]);
        }else{
            navigate("/login")
        }
    }
   
const logOut = () => {
    localStorage.removeItem("token");
    toast.success("Logout Success");
}

  

useEffect(()=>{
    getAll()
},[])
   return (
     <>
 <nav class="navbar navbar-expand-sm bg-light p-2">

  <div class="container-fluid">
     <ul class="navbar-nav">
      <li class="nav-item">
        <h3 className='mx-5'>Product Management</h3>
      </li>
       
         
 
    </ul>
  </div>

</nav>
     <div className='container m-5  w-50 shadow-lg rounded-5 p-5'>
        <h3>Add Product</h3>
        <form onSubmit={addProduct}>
            <label htmlFor="">Product Name</label>
            <input required onChange={(e)=>setform({...form,name:e.target.value})} value={form.name} className='form-control' placeholder='Enter Product Name' type="text" name="" id="" /><br />
            <label htmlFor="">Category</label>
            <input required onChange={(e)=>setform({...form,category:e.target.value})} value={form.category} className='form-control' placeholder='Enter Category' type="text" name="" id="" /><br />
            <label htmlFor="">Price</label>
            <input required onChange={(e)=>setform({...form,price:e.target.value})}  value={form.price} className='form-control' type="number" min={0} placeholder='Enter Price' /> <br />

            <label htmlFor="">InStock <br /> (choose 1 for   InStock and choose 0 for No Stock)</label> <br />
 
            <input required onChange={(e)=>setform({...form,inStock:e.target.value})}  className='m-2' type="radio" name="choice" value="false" /> 0        
            <input required onChange={(e)=>setform({...form,inStock:e.target.value})}  className='m-2' type="radio" name="choice" value="true" /> 1

            <div className='mt-2text-center text-center'>
                <button className='btn btn-primary' type="submit">{updateid!=null?"Update":"Add"}</button>
            </div>
           </form>
     </div>

     <div className='container mt-3'>
       <h1>Productlist</h1>
       <div className='row'>
        {data.length>=0?data.map((val,index)=>(
            <>
            <div key={index} className='col-4 p-3'>
                <div className='rounded-5 border p-4 shadow'>
                 <p>Name : {val.name}</p>
                 <p>Price : <span className='text-success'>$ {val.price}</span></p>
                 <p>Category : {val.category}</p>
                 <p>inStock : {val.inStock? "Yes" : "No"}</p>
                 
                <Link className="btn btn-primary" to={`/p/${val._id}`}>More Information</Link> 
                <button className='btn btn-outline-success m-2' onClick={()=>updateData(val._id,index)} type="button">Update</button>                
                <button className='btn btn-outline-danger m-2' onClick={()=>deleteData(val._id)} type="button">Delete</button>                
                </div>

            </div>
            </>
        )):<div></div>}
       </div>
       </div>
     </>
   )
 }
 
 export default Product
 