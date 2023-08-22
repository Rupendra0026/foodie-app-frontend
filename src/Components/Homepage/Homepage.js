import React, { useContext } from "react";
import './Homepage.css';

import Bikedelivery from '../../Assets/bikedelivery.PNG';
import Landingimg from '../../Assets/landingimg.PNG';
import timingimg from  '../../Assets/timigimg.PNG';
import hometown from '../../Assets/hometown.PNG';
import mobiloecell from '../../Assets/mobiloecall.PNG';
import qfood from '../../Assets/Qfood.PNG';
import Hfood from '../../Assets/Hfood.PNG';
import fastdelivery from '../../Assets/Fastdelivery.PNG';
import chooseimg from '../../Assets/chooseimg.PNG';
import preparefoodimg from '../../Assets/preparefoodimg.PNG';
import delivery from '../../Assets/deliverimg.PNG';
import clientimg from '../../Assets/clientimg.PNG';
import testimonialimg from '../../Assets/testimonialimg.PNG';
import leftarrow from '../../Assets/leftarrow.PNG';
import { useNavigate } from "react-router-dom";

import { homedata } from "../../Homedata";


import Footer from "../Footer/Footer";
import { Maincontext } from "../contextstore/Authcontext";

function Homepage(){
    // context data
    const {user,status,setCart}=useContext(Maincontext);
    
    const Addtocart=async(data)=>{
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


    const navigate= useNavigate()
    const [datascore,setdatascore]=React.useState(3);

    function leftsidehandle(){
        if(datascore-1<0){
            setdatascore(3);
        }else{
            setdatascore(datascore-1);
        }
    }

    function rightsidehandle(){
        if(datascore+1>3){
            setdatascore(0);
        }else{
            setdatascore(datascore+1);
        }
    }

    const backgroundtypes=[
        {
            name:'pravallika',
            job:'fullstack developer',
            descript:"really its a good expirence jfbgj jfbg new websiote fjub loerom akdgfiuh ipejgj"
        },
        {
            name:'prabhas',
            job:'bahubhali hero',
            descript:"lerom eam regh jklm nop[e] om areoplain is necessary fliught FU IMAPIOOR room agbiujhad kksafgbh "
        },
        {
            name:'pawan kalyan',
            job:'janasena former',
            descript:"really its a good expirence jfbgj jfbg new websiote fjub loerom akdgfiuh ipejgj"
        },
        {
            name:'Willians Jhone',
            job:'CEO & Co-Founder',
            descript:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Amet nisl tincidunt adipiscing dictumst blandit hac. Lectus 
            cras velit sed dignissim ac, aliquet. Metus egestas habitant 
            feugiat neque ultrices nunc, dolor egestas mus`
         }
        ];


    return(
        <>
        <div className="homaepage-container">
            <div className="homepage-page-first-div">
                <div className="homepage-page-first-first-div">
                    <div className="bikedelivery-container">
                        <p>Bike Delivery</p>
                        <img src={Bikedelivery} alt="bikedelivery-logo" className="bikedelivery-image"/>
                    </div>
                    <div className="homepage-header-con">
                        <p>The Fastest</p>
                        <p>Delivery</p>
                        <p>In <span>Your City</span></p>
                    </div>
                    <div className="homepage-header-description">
                        <p>
                        Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit. Commodo, sed proin amet a 
                        vestibulum enim volutpat lacus. Volutpat arcu 
                        sit sed tortor etiam volutpat ipsum. 
                        </p>

                    </div>
                    <div className="homepage-header-order-now">
                        <button className="homepage-order-now-btn">Order Now</button>
                    </div>
                </div>
                <div className="homepage-page-second-div">
                    <img src={Landingimg} className="landingimage-class" alt="lanhding-logo"/>
                </div>
            </div>

            {/* homepage-container- details about us */}
            <div className="homepage-about-details">
                <div className="homepage-about-details-each-div">
                    <img src={timingimg} alt="timing"/>
                    <h1>Today 10:00am - 10:00pm</h1>
                    <p>Working time</p>
                </div>
                <div className="homepage-about-details-each-div">
                    <img src={hometown} alt="hometown"/>
                    <h1>Washington, D.C., DC,USA</h1>
                    <p>Our Location</p>
                </div>
                <div className="homepage-about-details-each-div">
                    <img src={mobiloecell} alt="mobiloecell"/>
                    <h1>+0123 456 7891</h1>
                    <p>Phone Number</p>
                </div>
            </div>


            {/* most popular items */}
            <div className="most-popular-items-con">
                <div className="most-popular-items-con-div-1">
                    <p>Products</p>
                    <h2>most popular products</h2>
                </div>
                <div className="most-popular-items-con-div2">
                    {homedata.map((data)=>{
                        return(
                            <div className="homedata-each-card" key={data.id}>
                                <img src={data.url} alt='each-product' className="home-data-each-card"/>
                                <div className="home-data-each-card-names">
                                    <p>{data.name}</p>
                                    <div>
                                    <p onClick={()=>Addtocart(data)}>Add To Cart</p>
                                    <p><span>₹</span>{data.price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* see more details */}
            <div className="see-more-products-con" onClick={()=>navigate('/products')}>
            <p>See More Products</p>
            <img src={leftarrow} alt="left arrow" className="leftarrow-hompegae"/>
            </div>
            {/* services  */}

            <div className="services-container">
                <div className="services-header-homepage">
                    <h1>Services</h1>
                    <p>Why Choose Our Favorite Food</p>
                </div>
                <div className="services-container-all-div">
                    <div className="services-con-each-div">
                        <img src={qfood} alt="qfood"/>
                        <h1>Qualityfull Food</h1>
                        <p>But I must explain to you how all this
                            mistaken idea of denouncing pleasur and
                            prasising pain was bron.</p>
                    </div>
                    <div className="services-con-each-div">
                             <img src={Hfood} alt="hfood"/>
                            <h1>Healthy Food</h1>
                            <p>But I must explain to you how all this
                                mistaken idea of denouncing pleasur and
                                prasising pain was bron.</p>
                        </div>
                    <div className="services-con-each-div">
                        <img src={fastdelivery} alt="fastdelivery" />
                            <h1>Fast Delivery</h1>
                            <p>But I must explain to you how all this
                            mistaken idea of denouncing pleasur and
                            prasising pain was bron.</p>
                    </div>

                </div>
            </div>

            {/* homepage how to work  */}
            <div className="how-to-work-container">
                <div className="how-to-work-con-header">
                    <p>How to work</p>
                    <h1>Food Us An Important Part Of A Balanced Diet</h1>
                </div>
                <div className="how-to-work-all-divs">
                    <div className="how-to-work-each-div">
                        <img src={chooseimg} alt="choose-logo" />
                        <h1>CHOOSE</h1>
                        <p>Do you want to lose weight, exercise,
                        adhere to a therapeutic diet? Our
                        dietitian will help you with choosing the
                        right program!</p>
                    </div>

                    <div className="how-to-work-each-div">
                        
                        <h1>PREPARE FOOD</h1>
                        <p>Do you want to lose weight, exercise,
                        adhere to a therapeutic diet? Our
                        dietitian will help you with choosing the
                        right program!</p>
                        <img src={preparefoodimg} alt="preparefoodimg"/>
                    </div>

                    <div className="how-to-work-each-div">
                        <img src={delivery} alt="delivery" />
                        <h1>DELIVER</h1>
                        <p>Do you want to lose weight, exercise,
                            adhere to a therapeutic diet? Our
                            dietitian will help you with choosing the
                            right program!</p>
                    </div>
                </div>
            </div>

            {/* testimonials containers */}
            <div className="testimonials-homepage-con">
                <div className="testimonials-header-con">
                    <p>Testimonials</p>
                    <h1>Our Happy Client Says</h1>
                </div>
                
                <div className="testimonials-first-div">
                    <div className="testimonials-clients-div">
                        <div className="testimonial-left-right">
                            <button onClick={leftsidehandle}>Left</button>
                            <button onClick={rightsidehandle}>Right</button>
                        </div>
                        <div className="testimonials-client-details">
                            <img src={clientimg} alt="clientimg" />
                            <div>
                                <h1>{backgroundtypes[datascore].name}</h1>
                                <p>{backgroundtypes[datascore].job}</p>
                            </div>
                        </div>
                        <p>{backgroundtypes[datascore].descript}</p>

                    </div>
                    <img src={testimonialimg} alt="testimonial-logo" />
                </div>

            </div>

             {/* footer page */}
             <Footer/>
           
        </div>
        </>
    );
}

export default Homepage;