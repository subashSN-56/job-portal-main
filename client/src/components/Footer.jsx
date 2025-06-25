import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container mx-auto px-4 2xl:px-20 py-20 my-5  mt-20 mb-0 flex  items-center justify-between gap-4'>
        <img src={assets.logo} />
        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>All rights reserved || 2025 || Job Portal</p>
        <div className='flex gap-4'>
            <img width={38} src={assets.facebook_icon}/>
            <img width={38} src={assets.instagram_icon}/>
            <img width={38} src={assets.twitter_icon}/>

        </div>
    </div>
  )
}

export default Footer