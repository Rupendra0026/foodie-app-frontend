import React,{useContext,useState,useEffect} from 'react';
import './Products.css';
import { data } from '../../Data';
import { Maincontext } from '../contextstore/Authcontext';
import { useNavigate } from 'react-router-dom';
import filterimages from '../../Assets/filterimages.PNG';
function Products(){
    const navigate=useNavigate();
    const[productchg,setproductchg] = useState(data[3]);
    const[filteritem,setfilteritem] = useState('');

    function handleproducts(e){
        window.scrollTo({top:0,behavior:'smooth'})
        setproductchg(e);
    }

    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'})

    },[])
        // context data
        const {user,status,setCart}=useContext(Maincontext);
    
        const AddtoCart=async(data)=>{
            if(status){
                const send=await fetch('/addtocart',{
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({
                        data:data,userid:user._id
                    })
                });
                const res=await send.json();
                if(res.status==200){
                    alert(res.msg);
                    setCart(res.cartlist);
                }
                else{
                    alert(res.msg);
                }
            }
            else{
                alert("Login required");
                navigate('/login');
            }
        }
    return(
        <>
        <div className='product-container'>
            <div className='product-con-product-item'>
                <img src={productchg.url} alt="product-firt-item" className='product-con-header-img'/>
                <div className='product-con-first-header-div'>
                    <h1>{productchg.name}</h1>
                    <p>{productchg.cag}</p>
                    <p><span>₹</span> {productchg.price}</p>
                    <div className='product-but-and-add-btns'>
                    <button>Buy Now</button>
                    <button onClick={()=>AddtoCart(productchg)}>Add To Cart</button>
                </div>
                </div> 
            </div>
            <div className='realted-products-con'>
                <h1>Related Items</h1>
            </div>
            <div className='filter-items-con'>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>All</p>
                </div>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('fruits')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>Fruits</p>
                </div>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('vegetable')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>Vegetables</p>
                </div>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('rice')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>Rice</p>
                </div>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('cake')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>Cake</p>
                </div>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('burger')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>Burger</p>
                </div>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('icream')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>Icream</p>
                </div>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('pizza')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>Pizza</p>
                </div>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('dosa')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>Dosa</p>
                </div>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('panner')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>Panner</p>
                </div>
                <div className='filter-items-con-each' onClick={()=>setfilteritem('sandwich')}>
                    <img src={filterimages} className='filter-item-each-img' alt='filter-domain'/>
                    <p>Sandwich</p>
                </div>

            </div>
            <div className='products-all-con'>
            {
                filteritem===''?
            data.map((product)=>{
                return(
                    < div className='each-product-card' key={product.id} onClick={()=>handleproducts(product)}>
                    <img src={product.url} alt="src-data-all" className='product-mages' />
                    <div className='product-con-card-header-div'>
                    <h1>{product.name}</h1>
                    <p>{product.cag}</p>
                    <p><span>₹</span> {product.price}</p>
                    <div className='product-card-and-add-btns'>
                    <button onClick={()=>AddtoCart(product)}>Add To Cart</button>
                    </div>
                </div>
                    </div>
                )
            })
        :data.filter((item)=>item.cag===filteritem).map((product)=>{
                return(
                    < div className='each-product-card' key={product.id} onClick={()=>handleproducts(product)}>
                    <img src={product.url} alt="src-data-all" className='product-mages' />
                    <div className='product-con-card-header-div'>
                    <h1>{product.name}</h1>
                    <p>{product.cag}</p>
                    <p><span>₹</span> {product.price}</p>
                    <div className='product-card-and-add-btns'>
                    <button onClick={()=>AddtoCart(product)}>Add To Cart</button>
                    </div>
                </div>
                    </div>
                )
            })
            }
            </div>
        
                    {/*  */}
            
        </div>
        </>
    );
}

export default Products;