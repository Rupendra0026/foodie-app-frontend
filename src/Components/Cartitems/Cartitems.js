import React, { useContext } from 'react'
import { Maincontext } from '../contextstore/Authcontext'

const Cartitems = () => {
    const {status,cart}=useContext(Maincontext);
  return (
    <>
    <div className="cart">
        {
            status?cart.length==0?"no items available":cart&&cart.map((data)=>{
                return(
                    <>
                    <h1>{data.name}</h1>
                    <img src={data.imgurl} alt="" />
                    </>
                )
            }):"login to display items"
        }
    </div>
    </>
  )
}

export default Cartitems