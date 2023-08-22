import React from 'react';
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import Homepage from './Components/Homepage/Homepage';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Contactus from './Components/Contactus/Contactus';
import About from './Components/About/About';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Cartitems from './Components/Cartitems/Cartitems';

function App() {
  return (
    <BrowserRouter>
        <div>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/contactus' element={<Contactus/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/addtocart' element={<Cartitems/>}/>
          </Routes>
          
        </div>
    </BrowserRouter>
    
  );
}

export default App;
