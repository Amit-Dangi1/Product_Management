import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from 'react-toastify'
import SignUp from './components/SignUp'

       import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Product from './components/Product'
import OneProduct from './components/OneProduct'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer/>
  


 
    
      <Routes>
        <Route path="/signup" element={<><SignUp/></>}/>
        <Route path="/login" element={<><Login/></>}/>
        <Route path="/productlist" element={<Product />} />
        <Route path="/p/:id" element={<OneProduct />} /> 


 

         
      </Routes>
  
  

    </>
  )
}

export default App

 
         