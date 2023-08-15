import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import NavbarSearch from './NavbarSearch'

const Navbar = () => {
    const {user} =  useContext(UserContext)
    const [showSearch, setShowSearch] = useState(false)

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
      const updateScreenSize = () => {
        setWindowWidth(window.innerWidth);
      };
      updateScreenSize();
      window.addEventListener('resize', updateScreenSize);
      return () => {
        window.removeEventListener('resize', updateScreenSize);
      };
    }, []);



    const UserNavButton = () => {
      return (
        <Link to={user?"/account":"/login"} className='flex items-center border gap-2 border-gray-300 rounded-2xl py-2 px-3 shadow-lg max-md:w-32'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-primary rounded-full  text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {!!user && (
              <div>
                  {user.name}
              </div>
          )}

      </Link>
      )
    }
    

  return (
    <header className='w-full space-y-2 md:justify-between flex flex-col'>
      <div className='flex items-center w-full justify-between'>
        <a href='/' className='flex items-center gap-2'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 -rotate-90 text-primary">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
        <span className='font-bold text-xl'>Let's travel!</span>
        </a>
        <UserNavButton/>

      </div>
      <div className='relative w-full'>
        {windowWidth>768 ? 
        <NavbarSearch />:
        (<>
            <div className={showSearch?'':'hidden'}><NavbarSearch windowWidth={windowWidth} setShowSearch={setShowSearch}/></div>
            <div className= {!showSearch?'input-area shadow-lg font-bold':'hidden'} onClick={()=>setShowSearch(true)}>Search</div>
          </>)
        }
      </div>
    </header>
  )
}

export default Navbar