import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AccountNav = () => {
    const {pathname} = useLocation()
    let subpage = pathname.split('/')?.[2]
    if(subpage === undefined) subpage= 'profile'
    function linkClasses(type=null){

        let classes = 'py-2 px-6 text-center rounded-full'
        if (type === subpage){
            classes += " bg-primary text-white"
        }
        else{
            classes += " bg-gray-200"
        }
        return classes
    }
  return (
    <nav className='flex justify-center mt-8 gap-2 mb-9 px-3 mx-auto w-full text-sm md:text-md'>
        <Link className={linkClasses("profile")} to="/account">My profile</Link>
        <Link className={linkClasses("bookings")} to="/account/bookings">My bookings</Link>
        <Link className={linkClasses("places")} to="/account/places">My accommodations</Link>
    </nav>
  )
}

export default AccountNav