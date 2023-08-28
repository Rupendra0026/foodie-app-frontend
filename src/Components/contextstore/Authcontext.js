import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Maincontext=createContext();

const AuthContext = ({children}) => {
   
    const [status,setStatus]=useState(false);
    const[user,setUser]=useState("");
    const[cart,setCart]=useState([]);
    const[admin,setAdmin]=useState(false);
    const[userorders,setUserorders]=useState([]);
    const[productslist,setProductslist]=useState([]);
    // const navigate=useNavigate();
    const check=async()=>{
        const clientdata=await fetch('/check',{
            method:"GET",
            headers:{
                "Content-Type":"Application/json"
            }
        });
        const res=await clientdata.json();
        console.log(res);
        if(res.status===200){
            setStatus(res.user);
            setUser(res.clientdata);
            setCart(res.cartdata);
            setAdmin(res.clientdata.user);
            console.log(res.clientdata);
            //   console.log(res.userorders);
            setProductslist(res.productslist);
            console.log(res.productslist);
            console.log(res.allproducts);
            setUserorders(res.userorders);
        }
        else{
            setStatus(false);
            // navigate('/login');
        }
    }
    useEffect(()=>{
        check();
    },[])
  return (
    <>
      <Maincontext.Provider value={
        {status,setStatus,user,setUser,check,cart,
        setCart,setAdmin,admin,userorders,setUserorders,
        productslist,setProductslist}}>{children}</Maincontext.Provider>
    </>
  )
}

export {AuthContext,Maincontext};
