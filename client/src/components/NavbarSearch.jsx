import { addDays, format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { PlacesAutocomplete } from './Map'

const NavbarSearch = ({windowWidth, setShowSearch}) => {
    const navigate = useNavigate()

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [selected, setSelected] = useState({
        lat:'',
        lng: ''
    })
    const [guests, setGuests] = useState('')

    const addDaysToStateFormat= (date, days) =>{
        return format(addDays(new Date(date),days),'yyyy-MM-dd')
    }


    useEffect(()=>{
        if(new Date(checkIn)>=new Date(checkOut)) setCheckOut(addDaysToStateFormat(checkIn,1))
    },[checkIn])

    

    const handleClose = (e)=>{
        if(e)e.preventDefault()
        if(setShowSearch)setShowSearch(false)
    }
    
    const handleSearch = (e)=>{
        e.preventDefault()
        const params = createSearchParams({
            lat: selected.lat,
            lng: selected.lng,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: guests
        })
        handleClose()
        navigate(`/search?${params}`)
    }


    return (
    <>
    
    <form className='flex max-md:flex-col justify-center border gap-2 border-gray-300 rounded-2xl py-2 px-3 w-full shadow-lg animate-slide-down absolute md:static bg-white'>
        {windowWidth<768&&<button onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>}
        <div className='flex max-md:flex-col w-full justify-around'>
          <div className=' flex flex-col w-full px-2'>
          <span className='text-sm font-bold px-4'>Where</span>
            <PlacesAutocomplete className="input-area border-none" text="Destination" setSelected={setSelected}/>
            </div>
          <div className='flex flex-col border-l max-md:border-none w-full px-2'>
          <span className='text-sm font-bold px-4'>Check in</span>
            <input placeholder='Arrival date' required type='text' className='input-area border-none' onFocus={(e) => (e.target.type = "date")} onChange={(e)=>setCheckIn(e.target.value)} value={checkIn} min={format(Date.now(),"yyyy-MM-dd")}/>
          </div>
          <div className='flex flex-col border-l max-md:border-none w-full px-2'> 
          <span className='text-sm font-bold px-4'>Check out</span>
            <input placeholder='Leaving date' type='text' required className='input-area border-none' onFocus={(e) => (e.target.type = "date")} onChange={(e)=>setCheckOut(e.target.value)} value={checkOut} min={checkIn?checkIn:format(Date.now(),"yyyy-MM-dd")}/>
          </div>
          <div className='flex flex-col border-l max-md:border-none w-full px-2'>
          <span className='text-sm font-bold px-4'>Guests</span>
            <input placeholder='Number of guests' type='number' className='border-none' required min={1} value={guests} onChange={(e)=> setGuests(e.target.value)}/>
          </div>
          </div>
          <button className='bg-primary text-white rounded-full text-center max-md:w-full flex justify-center items-center p-1 w-[5%]' onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </form>
    </>
  )
}

export default NavbarSearch