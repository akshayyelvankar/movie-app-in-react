import { useEffect } from 'react';
import {fetchDataFromApi} from "./utils/api";
import {useSelector,useDispatch} from 'react-redux';
import { getApiConfiguration } from './Store/homeReducer';

function App() {
  
  const dispatch=useDispatch()
  const {url}=useSelector((state)=>state.home)
  console.log(url)
  useEffect(()=>{
     apiTest()
  },[])
  const apiTest=()=>{
    fetchDataFromApi("/movie/popular")
    .then((res)=>{
       console.log(res)
       dispatch(getApiConfiguration(res))
    })
    
  }
  return (
    <div className="App">
      
      
    </div>
  );
}

export default App;
