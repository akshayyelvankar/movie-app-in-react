import { useEffect } from 'react';
import logo from './logo.svg';
import {fetchDataFromApi} from "./utils/api";

function App() {
  
  useEffect(()=>{
     apiTest()
  },[])
  const apiTest=()=>{
    fetchDataFromApi("/movie/popular")
    .then((res)=>{
       console.log(res)
    })
  }
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
