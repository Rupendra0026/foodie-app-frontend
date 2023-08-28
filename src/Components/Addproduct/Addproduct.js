import React,{useContext, useEffect, useState} from 'react';
import './Addproduct.css';
import { ImagetoBase64 } from '../../ImagetoBase64';
import {homedata} from '../../Homedata';
import DeleteIcon from '@mui/icons-material/Delete';
import { Maincontext } from '../contextstore/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Addproducts(){
    const navigate=useNavigate();
    const{check,admin,productslist,setProductslist}=useContext(Maincontext);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [usedataset,setData]=useState(null);
    const [myimg,setMyimg]=useState();

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setData((prev)=> {
            return {
                ...prev,
                cag:event.target.value
            }
        })
    };

    const categories = ['fruits', 'vegetable', 'Home Appliances', 'rice', 'cake','burger','icream','pizza','dosa','panner','sandwich'];

   const  onsubmitform=async(e)=>{
    e.preventDefault();
    // console.log(myimg);
    console.log(usedataset);
    const formdata=new FormData()
    formdata.append('image',myimg)
    formdata.append('name',usedataset.name)
    formdata.append('price',usedataset.price)
    formdata.append('cag',usedataset.cag)
    formdata.append('desc',usedataset.des)
    const add=await axios.post('/addproduct',formdata);
    // console.log(add.data);
    console.log(add.data.productlist);
    setProductslist(add.data.productlist);
    alert(add.data.msg);
    navigate('/');
   }



const deletepro=async(data)=>{
    const del=await fetch(`/del_product/${data}`,{
        method:"GET",
        headers:{
            "content-type":"application/json"
        }
    });
    const res=await del.json();
    setProductslist(res.productslist);
    alert(res.msg);
}

   useEffect(()=>{
    check();
    if(!admin){
        navigate('/login');
    }
   },[]);
    return(
        <>
        <div className='Addproducts-header'>
            <h1>Add-products</h1>
            <p>Welcome to the Add Products page! This is 
            where you can effortlessly showcase your products
             for selling. Our platform empowers you to present 
             your items to a wide audience of potential buyers. 
             However, do remember that we've implemented a 
             category-based selling approach. This means that you 
             can list products belonging to specific categories 
             that align with our marketplace's offerings. This 
             approach ensures that your products are well-suited 
             to our audience, enhancing your selling experience 
             and connecting you with the right customers. Start a
             dding your products now and tap into a world of selling possibilities!</p>
        </div>
        <div className='addproduct-upload-con'>
            <h1>Upload Products</h1>
            
            <div className='addproduct-upload-form'>
                <div>
                    <label>name:</label>
                    <input type='text' placeholder='Enter name of the product' onChange={(e)=>setData((prev)=>{
                        return{
                            ...prev,
                            name:e.target.value
                        }
                    })}/>
                </div>
                <div>
                    <label>Select category:</label>
                    <select  id="category" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                            {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Price:</label>
                    <input type='number' placeholder='Enter you price in number' onChange={(e)=>setData((prev)=>{
                        return{
                            ...prev,
                            price:e.target.value
                        }
                    })}/>
                </div>
                <div>
                    <label>uploade-img:</label>
                    <input type="file" accept="image/*" onChange={(e)=>setMyimg(e.target.files[0])}/>
                    
                </div>
                <div>
                    <label>Description:</label>
                    <textarea placeholder='write about that content' onChange={(e)=>setData((prev)=>{
                        return{
                            ...prev,
                            des:e.target.value
                        }
                    })}/>
                </div>
                <button onClick={(e)=>onsubmitform(e)}>Submit</button>
            </div>

        </div>
        <div className='addproducts-display-products'>
            <h1>added products</h1>
            <div className='Addedproduct-display-container'>
        <div className='Addedproduct-con-each-all-cart'>
        {
            productslist&&productslist.map((product) => {
                return(
                    <div className='addcart-con-each-cart5'key={product.id}>
                        <img src={`http://localhost:5000/${product.imgurl}`} alt='product-content' className="addcart-each-img"/>
                        <div className='addcart-con-inside-div-part'>
                            <div className='addcart-con-each-cart-header'>
                            <h1>{product.product_name}</h1>
                            <button onClick={()=>deletepro(product._id)}><DeleteIcon fontSize='medium'/></button>
                            </div>
                            <p>{product.product_category}</p>
                            <p className='price-para-in-add-product'><span>₹</span>{product.product_price}</p>
                            
                        </div>
                    </div>
                )
            })
        }

                 </div>
             </div>
        </div>

        </>
    );
}

export default Addproducts;