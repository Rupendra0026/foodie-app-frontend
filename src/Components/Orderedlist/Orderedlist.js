import React, { useContext } from 'react';
import './Orderedlist.css';
import { homedata } from '../../Homedata';
import { Maincontext } from '../contextstore/Authcontext';

function Orderlist(){
    const{cart,admin,userorders}=useContext(Maincontext);

    // userorders dhi normal ga getcheysuko
    console.log("data:",cart);
    
    // const data=[{
    //     userid:'1234567890',
    //     name:'upendra naidu',
    //     pincode:'535591',
    //     address:'naidu street salur',
    //     products:homedata,
    //     delivery:true
    // }]
    return(
        <>
            <div className='orderlist-container-header'>
                <h1>Ordered-list</h1>
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
                userorders.map((products)=>{
                      return(
                          <div key={products.userid} className={products.delivery?'item-successfully-completed':'item-still-onprocessing'}>
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
                            <p className='orderedlist-last-item'><span>totalprice:</span> {products.totalprice}</p>
                        </div>
                      )
                })
            }

            </div>
        </>
    );
}

export default Orderlist;