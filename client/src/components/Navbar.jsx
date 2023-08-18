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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
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