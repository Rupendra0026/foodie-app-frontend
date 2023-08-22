import React, { createContext, useEffect, useState } from 'react'



const Maincontext=createContext();
const AuthContext = ({children}) => {
    const [status,setStatus]=useState(false);
    const[user,setUser]=useState("");
    const[cart,setCart]=useState([]);

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
        }
        else{
            setStatus(false);
        }
    }
    useEffect(()=>{
        check();
    },[])
  return (
    <>
      <Maincontext.Provider value={{status,setStatus,user,setUser,check,cart,setCart}}>{children}</Maincontext.Provider>
    </>
  )
}

export {AuthContext,Maincontext};
