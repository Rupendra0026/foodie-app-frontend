import React,{useState,useContext} from 'react';
import { Maincontext } from '../contextstore/Authcontext';
import './Login.css';
import { useNavigate } from 'react-router-dom';


function Login(){
    const navigate=useNavigate();
    const {status,setCart,setStatus,check,setAdmin,admin}=useContext(Maincontext);
    const[signin,setsignin]=useState(false);
    const[gmail,setGmail]=useState("");
    const[pass,setPass]=useState("");
    const[sgmail,setSgmail]=useState("");
    const[spass,setSpass]=useState("");
    const[scnfrm,setScnfrm]=useState("");
    
    const singupuser=async(e)=>{
        e.preventDefault();
        if(spass==scnfrm){
            const signup=await fetch('/registeruser',{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    gmail:sgmail,password:spass
                })
            });
            const res=await signup.json();
            if(res.status==200){
                setsignin(!signin);
                setStatus(true);
                setCart(res.cartlist);
            }
            alert(res.msg);
        }
        else{
            alert("password and confrompassword has to be same");
        }
    }

    const Loginuser=async(e)=>{
        e.preventDefault();
        const login=await fetch('/login',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                gmail:gmail,password:pass
            })
        });
        const res=await login.json();
        
       if(res.status==200){
        setStatus(res.user);
        setCart(res.cartlist);
        setAdmin(res.userdata.user);
        console.log(res.cartlist);
        
        alert(res.msg);
        navigate('/');
       }
       else{
        alert(res.msg);
       }
        
    }
    
    return(
        <>
            <div className={signin?'login-con-inactive':'login-con-sign-up'}>
                <h1>Sign In</h1>
                <form>
                    <label>Gmail</label>
                    <input type='email' placeholder='email'  onChange={e=>setGmail(e.target.value)}/>
                    <label>Password:</label>
                    <input type='password' placeholder='password' onChange={e=>setPass(e.target.value)}/>
                    <button onClick={Loginuser}>Sign In</button>
                </form>
                <p>Don’t have an Account?<span onClick={()=> setsignin(!signin)}  className='login-final-decision-btn'> Create account </span></p>
                </div>
            
            {/*sign up box using firebase */}
                <div className={signin?'login-con-sign-up':'login-con-inactive'}>
                <h1>Sign Up</h1>
                <form>
                    <label>Gmail</label>
                    <input type='email' placeholder='email' onChange={e=>setSgmail(e.target.value)}/>
                    <label>Password:</label>
                    <input type='password' placeholder='password' onChange={e=>setSpass(e.target.value)}/>
                    <label>Confirm Passwords:</label>
                    <input type='password' placeholder='confirm password' onChange={e=>setScnfrm(e.target.value)}/>
                    <button onClick={singupuser}>Sign Up</button>
                </form>
                <p>Already have an Account? <span onClick={()=> setsignin(!signin)}  className='login-final-decision-btn'>Sign In</span></p>
                </div>
        </>
    );
}

export default Login;