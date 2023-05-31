import { useEffect } from 'react';
import {fetchDataFromApi} from "./utils/api";
import {useSelector,useDispatch} from 'react-redux';
import { getApiConfiguration } from './Store/homeReducer';
import {Route,Routes} from 'react-router-dom';
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";
import Home from "./Pages/home/Home";
import SearchResult from "./Pages/searchResult/SearchResult";
import Details from "./Pages/details/Details";
import PageNotFound from './Pages/pageNotFound/PageNotFound';

function App() {
  
  const dispatch=useDispatch()
  const {url}=useSelector((state)=>state.home)
  console.log(url)
 
  // call Api
  useEffect(()=>{
     fetchApiConfig()
  },[])

  // Fetching Api
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
        <>
         <Header/>
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:mediaType/:id' element={<Details/>}/>
          <Route path='/search/:query' element={<SearchResult/>}/>

          {/* logic of multiple path use in single component */}
          {['movie','tv'].map(path=><Route path={path} element={<PageNotFound path={path}/>}/>)}
          </Routes>
          <Footer/>
        </>
  ); 
}

export default App;
