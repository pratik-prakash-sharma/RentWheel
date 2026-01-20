import React, { use } from 'react'
import { assets,} from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'


const NavbarOwner = () => {

  const {user} = useAppContext()
    
  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-t-borderColor relative transition-all'>
      <Link to='/'>
      <motion.img whileHover={{scale: 1.05}} 
                src={assets.rentwheel_logo} alt="logo" className= 'h-14 w-25' />
      </Link>
      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  )
}

export default NavbarOwner
