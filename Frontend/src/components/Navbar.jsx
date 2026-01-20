import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useAppContext } from '../context/AppContext'
const Navbar = () => {

    const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const ChangeRole = async () => {
        try {
           const {data} = await axios.post('/api/owner/change-role')
            if(data.success){
                setIsOwner(true)
                toast.success(data.message)
                navigate('/owner')
            }else{
                toast.error(error.message)
            }
        } catch (error) {
            
        }
    }
        

    return (
        <motion.div
        initial = {{y: -20, opacity: 0}}
        animate = {{y:0, opacity: 1}}
        transition = {{duration: 0.5}}
        className={`flex items-center justify-between lg:py-3 px-6 md:px-16 lg:px-24 xl:px-32 text-gray-600 border-b border-borderColor relative transition-all ${location.pathname === "/" ? "bg-light" : ""
            }`}>
            <Link to='/home'>
                <motion.img whileHover={{scale: 1.05}} 
                src={assets.rentwheel_logo} alt="logo" className= 'h-14 w-25' />
            </Link>
            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 transform z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
                {menuLinks.map((link, idx) => {

                    return <Link key={idx} to={link.path} className="hover:text-black transition-colors">
                        {link.name}
                    </Link>
                })}
                <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor rounded-full max-w-56 px-3'>
                    <input type="text"
                        className='py-1.5  w-full bg-transparent outline-none placeholder-gray-500 '
                        placeholder='Search Products'
                    />
                    <img src={assets.search_icon} alt="logo" />
                </div>
                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                    <button
                        onClick={() => {
                            {isOwner ? navigate('/owner') : ChangeRole()}
                        }}
                        className='cursor-pointer'>{isOwner ? 'Dashboard' : "List cars"}</button>
                    <button
                        onClick={() => {
                            {user ? logout() : setShowLogin(true)}
                        }}
                        className='cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg'>{user ? 'Logout' : 'Login'}</button>
                </div>
            </div>
            <button className='sm:hidden cursor-pointer' aria-label='menu' onClick={() => { setOpen(!open) }}>
                <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
            </button>
        </motion.div>
    )
}

export default Navbar
