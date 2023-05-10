import { useEffect } from 'react';
import {fetchDataFromApi} from "./utils/api";
import {useSelector,useDispatch} from 'react-redux';
import { getApiConfiguration } from './Store/homeReducer';
import {Route,Routes} from 'react-router-dom';
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";
import Home from "./Pages/home/Home";
import Explore from "./Pages/explore/Explore";
import PageNotFound from "./Pages/404/PageNotFound";
import SearchResult from "./Pages/searchResult/SearchResult";
import Details from "./Pages/details/Details";

function App() {
  
  const dispatch=useDispatch()
  const {url}=useSelector((state)=>state.home)
  console.log(url)
  useEffect(()=>{
     fetchApiConfig()
  },[])

  const fetchApiConfig=()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
       console.log(res)

       const url={
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original",
       }
       dispatch(getApiConfiguration(url))
    })
    
  }
  return (
    <div className="App">
         <Header/>
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:mediaType/:id' element={<Details/>}/>
          <Route path='/search/:query' element={<SearchResult/>}/>
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<PageNotFound/>}/>
         </Routes>
         <Footer/>
    </div>
  );
}

export default App;
