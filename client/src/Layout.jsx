import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <div className='relative'>
      <div className='py-3 px-6 flex flex-col min-h-screen pb-32'>
          <Navbar />
          <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout