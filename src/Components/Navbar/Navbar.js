import React, { useState,useContext } from 'react';
import './Navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { orange} from '@mui/material/colors';
import foodielogo from '../../Assets/foodielogo.PNG';
import { NavLink } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { Maincontext } from '../contextstore/Authcontext';
import { fabClasses } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
function Navbar(){
    const {status,setStatus,setCart,admin,setAdmin}=useContext(Maincontext);
    console.log(status);
    const navigate = useNavigate();
    const [responsive,setresponsive]=useState(true);
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
            setAdmin(false);
            alert(res.msg);
        }
        
    }
    return(
        <>
        <div className='Navbar-container'>
            <div>
                <img src={foodielogo} className='navbar-foodie-logo-img' alt="foodie-logo" onClick={()=>navigate('/')}/>
            </div>
            <ul>
            <NavLink to='/'><li>Home</li></NavLink>
                <NavLink to='/about'><li>About</li></NavLink>
                <NavLink to='/contactus'><li>ContactUs</li></NavLink>
                <NavLink to='/products'><li>Products</li></NavLink>
                
                {
                    admin?"":<NavLink to='/addtocart'><li>CartList</li></NavLink>
                }
                
                {
                    admin?"":<NavLink to='/orderedlist'><li>OrderedList</li></NavLink>
                }
                {
                    admin?<NavLink to='/allorders'><li>Orders</li></NavLink>:""
                }
                {
                    admin?<NavLink to='/addproduct'><li>admin</li></NavLink>:""
                }
            </ul>
            <div className='active-navbar-div'>
            {
                    
                    status? <button onClick={logoutuser} className='nav-logout-btn'>logout</button>: <AccountCircleIcon fontSize="large" sx={{color: orange[500]}} className='profile-appear' onClick={()=>navigate('/login')}/>
                }
            </div>
            <div className='responsive-navbar'>
                    {responsive?<MenuIcon fontSize='large' onClick={()=>setresponsive(false)}/>:<CloseIcon fontSize='large' onClick={()=>setresponsive(true)}/>}
            </div>
      
        </div>
        <nav className={responsive?'navbar-responsive-from-outside':'inactive-navbar-responsive-from-outside'}>
                <ul>
                        <NavLink to='/' onClick={()=>setresponsive(true)}><li>Home</li></NavLink>
                        <NavLink to='/about' onClick={()=>setresponsive(true)}><li>About</li></NavLink>
                        <NavLink to='/contactus' onClick={()=>setresponsive(true)}><li>ContactUs</li></NavLink>
                        <NavLink to='/products' onClick={()=>setresponsive(true)}><li>Products</li></NavLink>
                        
                        {
                            admin?"":<NavLink to='/addtocart' onClick={()=>setresponsive(true)}><li>CartList</li></NavLink>
                        }
                        {
                            admin?"":<NavLink to='/orderedlist' onClick={()=>setresponsive(true)}><li>OrderedList</li></NavLink>
                        }
                        <NavLink to='/login' onClick={()=>setresponsive(true)} ><li className={status?'navlink-res-nav-link':'navlink-res-in-active'}>Login</li></NavLink>
                        {
                            admin?<NavLink to='/addproduct' onClick={()=>setresponsive(true)}><li>admin</li></NavLink>:""
                        }
                        {
                                admin?<NavLink to='/allorders' onClick={()=>setresponsive(true)}><li>Orders</li></NavLink>:""
                        }
                        {
                            status?<NavLink to='/login' onClick={()=>setresponsive(true)} ><li onClick={logoutuser}>logout</li></NavLink>:""
                        }
                </ul>
            </nav>
        </>
    );
}

export default Navbar;