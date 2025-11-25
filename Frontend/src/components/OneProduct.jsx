import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../Api';

const OneProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);     
  const navigate = useNavigate(null);   
 
  const getOneProduct = async () => {
    try {
      let res = await axios.get(`${api.getOneProduct}/${id}`);

      if (!res.data.isProduct) {
        setData(null);
      } else {
        setData(res.data.isProduct);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error loading product");
    } 
  };

  const back1 = ()=>{
    navigate(-1)
  }

  useEffect(() => {
    getOneProduct();
  }, [id]);
 

   if (!data) return <h2>Product Not Found</h2>;

  return (
    <div className='container col-4 p-3'>
        <h3>Fetch By Id</h3>
      <button onClick={back1} className='btn btn-secondary mb-3'>Back</button>

      <div className='rounded-5 border p-4 shadow'>
        <p>Name : {data.name}</p>
        <p>Price : <span className='text-success'>$ {data.price}</span></p>
        <p>Category : {data.category}</p>
        <p>inStock : {data.inStock ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default OneProduct;
