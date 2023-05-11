import React from 'react'
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../Components/switchTab/SwitchTab';

const Trading = () => {
   const onTabchange=()=>{

   } 
  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className='carouselTitle'>Trending</span>
        <SwitchTabs data={["day","week"]} onTabchange={onTabchange}/>
      </ContentWrapper>
    </div>
  )
}

export default Trading
