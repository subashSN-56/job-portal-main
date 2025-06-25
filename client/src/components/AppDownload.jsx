import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='container mx-auto px-4 2xl:px-20 py-20 my-8'>
        <div className='relative bg-gradient-to-r from-violet-50 to-purple-50 p-12  sm:p-24 lg:p-32 rounded-lg'>
            <div>
                <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold mb-4'>Download Mobile App For Better Experience</h1>
                <div className='flex gap-4 items-center mb-8'>
                    <a className='inline-block' href='#'>
                        <img className='h-12' src={assets.play_store} />
                    </a>
                    <a className='inline-block' href='#'>
                        <img className='h-12' src={assets.app_store} />
                    </a>
                </div>
            </div>

            <img className='absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden' src={assets.app_main_img} alt="mobile app" />
        </div>
    </div>
  )
}

export default AppDownload