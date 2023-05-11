import React from 'react';
import './style.scss';
import HeroBanner from './heroBanner/HeroBanner';
import Trading from './trading/Trading';
const Home = () => {
  return (
    <div className='homePage'>
        <HeroBanner/>
        
        <Trading/>
        <div style={{height:"100vh"}}></div>
    </div>
  )
}

export default Home
