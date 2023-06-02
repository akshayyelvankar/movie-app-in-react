import React from 'react';
import "./style.scss";
const PageNotFound = ({path}) => {
    
    console.log(path)
   
  return (
    <div className='pagenotfound_container'>
    <div className='container'>
        {
            path==='\movie'? <h1 className='text'>Movie Not Found</h1>
            :<h1 className='text'>Tv Show Not Found</h1>
        }
   </div>
   </div>
  )
}
export default PageNotFound;
