import React, { useContext } from 'react';
import './Navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { orange} from '@mui/material/colors';
import foodielogo from '../../Assets/foodielogo.PNG';
import { NavLink } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { Maincontext } from '../contextstore/Authcontext';
function Navbar(){
    const {status,setStatus,setCart}=useContext(Maincontext);
    console.log(status);
    const navigate = useNavigate();

    // logout user
    const logoutuser=async()=>{
        const logout=await fetch('/logout',{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        });
        const res=await logout.json();
        
        if(res.status==200){
            setStatus(res.user);
            navigate('/login')
            setCart([]);
            alert(res.msg);
        }
        
    }
    return(
        <div className='Navbar-container'>
            <div>
                <img src={foodielogo} className='navbar-foodie-logo-img' alt="foodie-logo" onClick={()=>navigate('/')}/>
            </div>
            <ul>
                <NavLink to='/'><li>Home</li></NavLink>
                <NavLink to='/about'><li>About</li></NavLink>
                <NavLink to='/contactus'><li>ContactUs</li></NavLink>
                <NavLink to='/products'><li>Products</li></NavLink>
                <NavLink to='/addtocart'><li>CartList</li></NavLink>
            </ul>
            {
                    
                    status? <button onClick={logoutuser}>logout</button>: <AccountCircleIcon fontSize="large" sx={{color: orange[500]}} className='profile-appear' onClick={()=>navigate('/login')}/>
                }
           
      
        </div>
    );
}

export default Navbar;