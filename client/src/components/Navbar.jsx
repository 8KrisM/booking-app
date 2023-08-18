import React, { useContext, useState, useEffect } from 'react'
import NavbarSearch from './NavbarSearch'
import UserNavButton from './UserNavButton'

const Navbar = () => {
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

    

  return (
    <header className='w-full space-y-2 md:justify-between flex flex-col z-1'>
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
            <div className='input-area shadow-lg font-bold' onClick={()=>setShowSearch(prev=>!prev)}>
              {showSearch?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                :'Search'
              }
            </div>
            <div className={showSearch?'':'hidden'}><NavbarSearch showSearch={showSearch} setShowSearch={setShowSearch}/></div>
          </>)
        }
      </div>
    </header>
  )
}

export default Navbar