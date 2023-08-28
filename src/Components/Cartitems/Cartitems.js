import React, { useContext,useCallback,useState,useEffect } from 'react'
import { Maincontext } from '../contextstore/Authcontext'
import './Cartitems.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
// import orders from '../../../../server/models/Orders';
import emptyimg from '../../Images/empty.gif';
const Cartitems = () => {
  const navigate=useNavigate();
    const {status,cart,setCart,user,userorders,setUserorders,check}=useContext(Maincontext);
    console.log(cart);
    const [cartItems, setCartItems] = useState(cart);
    const [totalprice, settotalprice] = useState(0);
    const[ordarr,setOrdarr]=useState(userorders);
    const refresh=()=>{
      setOrdarr(userorders);
      setCartItems(cart);
    }
    const[ord,setOrd]=useState({
      name:"",
      mobile:"",
      pincode:"",
      address:""
    });
    let name="";
    let value="";
    const setdata=(e)=>{
      name=e.target.name;
      value=e.target.value;
      setOrd({...ord,[name]:value});
    }

      const handleQuantityChange = useCallback((productId, newQuantity) => {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item._id === productId ? { ...item, __v: newQuantity } : item
          )
        );
      }, []);

      function handletotalprice(product){
        settotalprice((price)=>price+Number(product.__v)*Number(product.price))
      }

      const handleIncrease = (product) => {
        settotalprice((price)=>price+Number(product.price))
        handleQuantityChange(product._id, product.__v + 1);

      };
    
      const handleDecrease = (product) => {
        if (product.__v  > 1) {
            settotalprice((price)=>price-Number(product.price))
            handleQuantityChange(product._id, product.__v  - 1);
        }
      };

      function toggle(e){
        e.preventDefault();
        var blur=document.getElementById('blur');
        var popup = document.getElementById('popup');
        popup.classList.toggle('active');
        blur.classList.toggle('active');

      }


      const delitem=async(data)=>{
        console.log(data);
        const productid=await data._id;
        const userid=await data.userid;

        const del=await fetch(`/delcartitem`,{
          method:"post",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({
            productid:productid,userid:userid
          })
        });
        const res=await del.json();
        if(res.status==200){
          setCart(res.cartitems);
          setCartItems(res.cartitems); 
          
        }
        alert(res.msg);
        console.log(res);
      }

      const placeorder=async()=>{
        var blur=document.getElementById('blur');
        var popup = document.getElementById('popup');
        popup.classList.toggle('active');
        blur.classList.toggle('active');
        // console.log(ord);
        // console.log(cart);
        // console.log(user);
        // console.log(totalprice);
        const order=await fetch('/placeorder',{
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({cart:cartItems,user:user,totalprice:totalprice,ord:ord})
        });
        const res=await order.json();
        console.log(res);
        if(res.status==200){
          console.log(res.data); 
          setUserorders(res.orderslist);
          setOrdarr(res.orderslist);
          setCart(res.cart);
          setCartItems(res.cart);
        }
        alert(res.msg);
        navigate('/');
      }

useEffect(()=>{
  check();
  if(!user){
    alert("please login")
    navigate('/login');
  }
},[]);
  return (
    <>
    <div className="cart" id="blur">
        {
            status?cart.length==0?<div className="empty-cart-con">
            <h1>empty cart !!</h1>
              <img src={emptyimg} alt="empty-cart" className="empty-cartitems-img"/>
            </div>:cartItems&&<div className='addcart-con-each-all-cart'>
            <div className='addcart-con-each-all-cart-strating-grid'>{
            cartItems.map((product) => {
                return(
                    <div className='addcart-con-each-cart5'key={product._id} onLoad={()=>handletotalprice(product)}>
                        <img src={product.imgurl} alt='product-content' className="addcart-each-img"/>
                        <div className='addcart-con-inside-div-part'>
                            <div className='addcart-con-each-cart-header'>
                            <h1>{product.name}</h1>
                            <span onClick={()=>delitem(product)}><DeleteIcon fontSize='medium' /></span>
                            </div>
                            <p>{product.cag}</p>
                            <p className='price-para-in-add-product'><span>₹</span>{product.price}</p>
                            <div className='in-de-total-price-addcart'>
                                <div className='increase-decrease-product-item'>
                                    <p onClick={()=>handleIncrease(product)}>+</p>
                                    <h2 >{product.__v}</h2>
                                    <p onClick={()=>handleDecrease(product)}>-</p>
                                </div>
                                <div>
                                    <p>Total:<span>₹</span>{product.__v*Number(product.price)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
        <div className='cartitem-over-all-bill'>
            <h1>over all Bill</h1>
            <p>total Products: {cart.length}</p>
            <p>total amount: {totalprice}</p>
            <button onClick={(e)=>toggle(e)}>Buy Now</button>
        </div>
        </div>:"login to display items"
        }
    </div>
    <div id="popup" className='popup-cartitem-container'>
        <p>total amount: {totalprice}</p>
        <h2>thank you for choosing foodie</h2>
        <p>One step closer to order please enter your details</p>
        <div className='popup-cartitem-container-each-div'>
            <label>name:</label>
            <input type='text' placeholder='enter your name' name="name" onChange={(e)=>setdata(e)}/>
        </div>
        <div className='popup-cartitem-container-each-div'>
            <label>mobile:</label>
            <input type='number' placeholder='enter your mobile number' name="mobile" onChange={(e)=>setdata(e)}/>
        </div>
        <div className='popup-cartitem-container-each-div'>
            <label>pincode:</label>
            <input tyep="number" placeholder='pincode'name="pincode" onChange={(e)=>setdata(e)}/>
        </div>
        <textarea rows="4" cols="50" placeholder='enter your address' className='popup-cartitem-container-each-div-textarea' name="address" onChange={(e)=>setdata(e)}/>
        <div className='order-close-btns'>
        <p onClick={placeorder} className='popup-cartitem-container-each-div-p'>Order</p>
          <p onClick={toggle} className='popup-cartitem-container-each-div-p'>close</p>
        </div>
        
    </div>
    {/* <div className="orders">
      <h1>ordered list</h1>
      {
        ordarr.map((d)=>{
          return(
            <>
            {
              d.products.map((data)=>{
                return(
                  <>
                  <div key={data._id}>
                  <h1>{data.name}</h1>
                  <h1>{data.__v}</h1>
                  <h1>{data.price}</h1>
                  <img src={data.imgurl} alt="" />
                  
                  </div>
                  </>
                )
              })
            }
            </>
          )
        })
      }
    </div> */}
    </>
  )
}

export default Cartitems