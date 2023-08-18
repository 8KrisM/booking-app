import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom'


const Account = () => {
    const {logout,user} = useContext(UserContext)

  return (
    <div>
        <div className="animate-slide-down mt-10">
                <div className='text-center mx-auto'>
                    Logged in as {user.name} <br/>
                    {user.email}<br/>
                    <button onClick={logout} className='primary max-w-xs mt-2'>
                        Logout
                    </button>
                </div>
        </div>


    </div>
  )
}

export default Account