import React,{useContext, useEffect, useState} from 'react'
import './Allorders.css';
import { Maincontext } from '../contextstore/Authcontext';
import { useNavigate } from 'react-router-dom';

const Allorders = () => {
    const navigate=useNavigate();
    const{admin,check}=useContext(Maincontext);
    const[adminord,setAdminord]=useState([]);
    const[updata,setUpdata]=useState();
    const[stat,setStat]=useState(false);
    const adminorders=async()=>{
        const data=await fetch('/adminorders',{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        });
        const res=await data.json();
        console.log(res.data);
        setAdminord(res.data);
    }
    useEffect(()=>{
        adminorders();
        check();
        if(!admin){
            navigate('/login');
        }

    },[]);
    const updatestatus=async(e)=>{
        const update=await fetch(`/updatestatus/${e}`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        });
        const res=await update.json();
        if(res.status==200){
            setStat(true);
            setAdminord(res.data);
            navigate('/orders');
        }
        alert(res.msg);
    }

    return (
        
        <>
            <div className='orderlist-container-header'>
                <h1>All-orders</h1>
                <p>Experience a user-specific ordered list page 
                that elegantly displays curated items in a 
                meticulously structured sequence. Seamlessly 
                organize your chosen content on this personalized 
                platform, offering a clear overview of your 
                preferences. Dive into your dedicated page and 
                uncover a tailored display that presents your 
                individualized choices in a beautifully ordered 
                manner</p>
            </div>
            <div className='orderedlist-each-order'>
            {
                adminord.map((products)=>{
                      return(
                          <div key={products.userid} className="allorders-product-con-each">
                            <button className={products.delivery?"order-done-button":"order-placed-button"} onClick={(e)=>updatestatus(products._id)}>Order Placed</button>
                            <p><span>ordered_person:</span> {products.name}</p>
                            <p><span>pincode:</span> {products.pincode}</p>
                            <p><span>Address:</span> {products.address}</p>
                            <p><span>status:</span> {products.delivery?'delivered':'on processing'}</p>
                            <div className='ordered-items-in-products'>
                                {
                                    products.products.map((items)=>{
                                        return(<div key={items._id} className='product-list-of-items'>
                                            <img src={items.imgurl} alt="products-display" className='orderedlist-each-order-img'/>
                                            <p>{items.__v} X ₹{items.price}</p>
                                            <p>{items.name}</p>
                                        </div>)
                                    })
                                }
                            </div>
                            <p className='orderedlist-last-item'><span>totalprice:</span>₹ {products.totalprice}</p>
                        </div>
                      )
                })
            }

            </div>
        </>
  )
}

export default Allorders