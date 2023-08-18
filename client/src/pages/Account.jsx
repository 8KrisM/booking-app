import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Places from '../components/Places'
import AccountNav from '../components/AccountNav'

const Account = () => {
    const [redirect, setRedirect] = useState(null)
    const {ready, user, setUser} = useContext(UserContext)

    let {subpage}=useParams()
    if(subpage === undefined){
        subpage= "profile"
    }

    const  logout = async () =>{
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }
    
    if(!ready){
        return 'Loading...'
    }

    if(ready && !user && !redirect){
        return <Navigate to={"/login"}/>
    }


    if(redirect){
        return <Navigate to={redirect}/>
    }

  return (
    <div>
        <div className="animate-slide-down mt-10">
            {subpage === 'profile' && (
                <div className='text-center mx-auto'>
                    Logged in as {user.name} <br/>
                    {user.email}<br/>
                    <button onClick={logout} className='primary max-w-xs mt-2'>
                        Logout
                    </button>
                </div>
            )}
        </div>


    </div>
  )
}

export default Account