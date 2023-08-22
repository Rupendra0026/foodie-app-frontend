import React from 'react';
import './Footer.css';
import facebookimg from '../../Assets/facebookimg.PNG';
import linkedinimg from '../../Assets/linkedinimg.PNG';
import twitterimg from '../../Assets/twitterimg.PNG';
import instaimg from '../../Assets/instaimg.PNG';

function Footer(){

    return(
        <>
            <div className='Footer-container'>
                <div className='footer-con-item-1'>
                    <h1>Foodie</h1>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Commodo libero viverra dapibus odio sit malesuada in quis. 
                    Arcu tristique elementum viverra integer id.
                    </p>
                    <div className='footer-con-item-social-media'>
                        <img src={facebookimg} alt="facebook-logo"/>
                        <img src={linkedinimg} alt="linedin-logo"/>
                        <img src={twitterimg} alt="twitter-logo"/>
                        <img src={instaimg} alt="insta-logo"/>
                    </div>
                </div>
                <div className='footer-con-item-2'>
                    <h1>Opening Restaurant</h1>
                    <ul>
                        <li>Sat-Wet: 09:00am-10:00PM</li>
                        <li>Thursdayt: 09:00am-11:00PM</li>
                        <li>Friday: 09:00am-8:00PM</li>
                    </ul>

                </div>
                <div className='footer-con-item-3'>
                    <h1>User Link</h1>
                    <ul>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Order Delivery</li>
                        <li>Payment & Tex</li>
                        <li>Terms of Services</li>
                    </ul>

                </div>
                <div className='footer-con-item-4'>
                    <h1>Contact Us</h1>
                    <ul>
                        <li>1234 Country Club Ave</li>
                        <li>NC 123456, London, UK</li>
                        <li>+0123 456 7891</li>
                    </ul>

                </div>

            </div>
        </>
    );
}

export default Footer;