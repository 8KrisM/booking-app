import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"

const UserNavButton = () => {
    const {user, logout} =  useContext(UserContext)
    const navigator = useNavigate()

    const [showDropdown, setShowDropdown]= useState(false)
    const [darkmode, setDarkmode] = useState(localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))

    const handleDarkmode = () =>{
        setDarkmode(prev=>!prev)
        if(darkmode)localStorage.theme = "light";
        else localStorage.theme = "dark";
    }

    useEffect(()=>{
        if(!darkmode){
            document.body.classList.remove('dark');
        }
        else {
            document.body.classList.add('dark');
        }
    },[darkmode])
    
    const navigateToLogin = ()=>{
        if(!user)navigator("/login")
    }


    return (
        <div className="relative"
            onMouseLeave={()=>setShowDropdown(false)}
            onClick={navigateToLogin} >
            <div className={`${showDropdown&&user?"w-[280px] border-none rounded-t-2xl rounded-b-none bg-white dark:bg-darkPick":""} flex right-0 absolute -top-4 justify-center items-center border gap-2 border-gray-300 rounded-2xl py-1 px-3 shadow-lg hover:cursor-pointer`} 
            onClick={()=>setShowDropdown(prev=>!prev)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {!!user ? 
                    <div className="truncate">
                        {user?.name?.trim().split(' ')[0]}
                    </div>
                    :<div>
                        Login
                    </div>
            }
            </div>
            {showDropdown&& user &&
                <div className={"absolute top-3 right-0 z-10 bg-white dark:bg-darkPick py-3 rounded-b-2xl shadow-xl w-[280px]"}>
                        <div className="grid grid-cols-2 gap-3 px-3">
                            <div className="user-nav-menu-button hover:bg-transparent hover:dark:bg-transparent ">
                                <input type="checkbox" className="darkmode-checkbox" checked={darkmode} onChange={handleDarkmode}/>
                                {darkmode?"Lightmode":"Darkmode"}
                            </div>
                            <Link to="/account" className="user-nav-menu-button" onClick={()=>setShowDropdown(prev=>!prev)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Account
                            </Link>
                            <Link to="/account/bookings" className="user-nav-menu-button" onClick={()=>setShowDropdown(prev=>!prev)}> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                                Bookings
                            </Link>
                            <Link to="/account/places" className="user-nav-menu-button" onClick={()=>setShowDropdown(prev=>!prev)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                Accomodations
                            </Link>
                            <Link onClick={()=> {setShowDropdown(prev=>!prev);logout()}} className="hover:bg-gray-700 px-3 py-2 bg-primary text-center text-white rounded-2xl m-3 col-span-2">
                                Logout
                            </Link>
                        </div>
                </div>
            }
    </div>
    )
  }

export default UserNavButton