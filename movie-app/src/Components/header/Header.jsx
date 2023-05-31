import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import './style.scss';

const Header = () => {
  const[show,setShow]=useState("top");
  const[lastSCrollY,setLastScrollY]=useState(0);
  const[mobileMenu,setMobileMenu]=useState(false);
  const[query,setQuery]=useState("")
  const[showSearch,setShowSearch]=useState("");
  const navigate = useNavigate();
  const location = useLocation(); 

  // Scroll Functionality
    const controlNavbar=()=>{
      if(window.scrollY > 200)
      {
        if(window.scrollY > lastSCrollY && !mobileMenu)
        {
          setShow("hide")
        }
        else{
           setShow("show")
        }
      }
      else{
        setShow("top")
      }
      setLastScrollY(window.scrollY)
    }
    useEffect(()=>{
      window.addEventListener("scroll",controlNavbar)
      return()=>{
        window.removeEventListener("scroll",controlNavbar)
      }
    },[lastSCrollY])

  // After move to the page scroll set at top
      useEffect(()=>{
          window.scrollTo(0,0)
      },[location])  
   
  // Search Menu
  const searchqueryHandler=(e)=>{
    if(e.key ==="Enter" && query.length>0)
    {
         navigate(`/search/${query}`);
         setTimeout(()=>{
           setShowSearch(false)
         },1000)
    }
    }
    // Mobile Menu
   const opneSearch=()=>{
     setMobileMenu(false)
     setShowSearch(true)
   }
   const openMobileMenu=()=>{
     setMobileMenu(true)
     setShowSearch(false)
   }

   // Navigate to pages
   const navigationHandler=(type)=>{
      if(type === "movie")
      {
        navigate("/explore/movie")
      }
      else{
        navigate("/explore/tv")
      }
      setMobileMenu(false)
   }
  return (

    <header className={`header ${mobileMenu ? "mobileView" :""} ${show}`}>
        <ContentWrapper>
           <div className="logo">
            <img src={logo} alt="" onClick={()=>navigate("/")}/>
           </div>
           <ul className="menuItems">
           <li className="menuItem" onClick={()=>navigate("/")}>Home</li>
            <li className="menuItem" onClick={()=>navigate("/movie")}>Movies</li>
            <li className="menuItem" onClick={()=>navigate("/tv")}>TV Shows</li>
            <li className="menuItem"><HiOutlineSearch onClick={opneSearch}/></li>
           </ul>
           <div className="mobileMenuItems">
            <HiOutlineSearch onClick={opneSearch}/>
            {
              mobileMenu ? <VscChromeClose onClick={()=>setMobileMenu(false)}/> :<SlMenu onClick={()=>openMobileMenu()}/>
            }
          </div>
        </ContentWrapper>
        {
          showSearch && (
            <div className="searchBar"> 
            <ContentWrapper>
             
               <div className='searchInput'>
                <input type='text' placeholder='Search for a movie or tv show...' onKeyUp={searchqueryHandler} onChange={(e)=>setQuery(e.target.value)}/>
                <VscChromeClose onClick={()=>setShowSearch(false)}/>
              </div>
            </ContentWrapper>
            </div>  
          )
        }
        
    </header>
  )
}

export default Header
