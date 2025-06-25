import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { UserButton , useClerk , useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const {openSignIn} = useClerk()
    const {user} = useUser();
    const navigate = useNavigate();

    const {setShowRecruiterLogin} = useContext(AppContext);

    // console.log(user)

  return (
    <div className='shadow py-4'> 
        <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
            <img onClick={() => navigate('/')} className='h-12 cursor-pointer'  src={assets.logo} alt='logo '/>
            {
                user 
                ?
                <div className='flex items-center gap-4 '>
                    <Link  to={'/applications'}>Apllied Jobs </Link>
                    <p>|</p>
                    <p className='max-sm:hidden'> Hi , {user.firstName+ " "+  (user.lastName || "") }</p>
                    <UserButton/>

                </div>
                :
                 <div  className='flex gap-4 max-sm:text-xs'>
                <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login </button>
                <button onClick={e => openSignIn()} className='bg-blue-500 px-6 sm:px-9 py-2 rounded-full text-white hover:bg-blue-700' > Login </button>

            </div>

            }
           
        </div>
    </div>
  )
}

export default Navbar