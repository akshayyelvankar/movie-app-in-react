import React, { useEffect, useState } from 'react'
import './style.scss';
import {useNavigate} from "react-router-dom";
import useFetch from '../../../hooks/useFetch';
import Img from "../../../Components/lazyLoadImages/Img";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import { useSelector } from 'react-redux';
const HeroBanner = () => {
  const[background,setBackground]=useState("");
  const[query,setQuery]=useState("");
  const navigate=useNavigate();
  const {url} =useSelector((state)=>state.home)
  // Fetching Data From APi
  const {data,loading}=useFetch("/movie/upcoming");

  //Fetching Random Background image
     useEffect(()=>{
        const bg=url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
         setBackground(bg);
        },[data])
   
  const searchqueryHandler=(e)=>{
       if(e.key ==="Enter" && query.length>0)
       {
            navigate(`/search/${query}`)
       }
  }
  return (
    <div className='heroBanner'>
      {
        !loading && <div className='backdrop-img'>
            <Img src={background}/>
         </div>
      }
        <div className='opacity-layer'></div>
      <ContentWrapper>
         <div className='heroBannerConent'>
          <span className='title' style={{color:"#fff"}}>Welcome</span>
          <span className='subTitle'>Millions of movies,TV shows and People to discover,Explore now.</span>
          <div className='searchInput'>
            <input type='text' placeholder='Search for a movie or tv show...' onKeyUp={searchqueryHandler} onChange={(e)=>setQuery(e.target.value)}/>
            <button>Search</button>
          </div>
        </div>
     </ContentWrapper>
       
    </div>
  )
}

export default HeroBanner
