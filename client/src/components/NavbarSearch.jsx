import { addDays, format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { PlacesAutocomplete } from './Map'
import { SearchContext } from '../SearchContext'

const NavbarSearch = ({setShowSearch}) => {
    const navigate = useNavigate()
    const {address,checkIn, checkOut, selected, 
      guests, allInputValid,setAddress, setCheckIn,
      setCheckOut,setSelected,setGuests,
      setAllInputValid, addDaysToStateFormat} = useContext(SearchContext)


    const handleClose = (e)=>{
        if(e)e.preventDefault()
        if(setShowSearch)setShowSearch(false)
    }
    
    const handleSearch = (e)=>{
        e.preventDefault()
        if(!selected.lat||!selected.lng||!checkIn||!checkOut||!guests||guests<1) {
          setAllInputValid(false)
        }
        else{
          setAllInputValid(true)
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
    }


    return (
    <div className='border border-gray-300 rounded-2xl w-full shadow-lg animate-slide-down absolute md:static py-2 px-3 dark:bg-bgDark'>
    <form className='flex max-md:flex-col justify-center gap-2 w-full'>
        <div className='flex max-md:flex-col w-full justify-around'>
          <div className=' flex flex-col w-full px-2'>
          <span className='text-sm font-bold px-4'>Where</span>
            <PlacesAutocomplete className="input-area border-none" text="Destination" setSelected={setSelected} address={address} setAddress={setAddress}/>
            </div>
          <div className='flex flex-col border-l max-md:border-none w-full px-2'>
          <span className='text-sm font-bold px-4'>Check in</span>
            <input placeholder='Arrival date' required type='text' className='input-area border-none' onFocus={(e) => (e.target.type = "date")} onChange={(e)=>setCheckIn(e.target.value)} value={checkIn} min={format(Date.now(),"yyyy-MM-dd")}/>
          </div>
          <div className='flex flex-col border-l max-md:border-none w-full px-2'> 
          <span className='text-sm font-bold px-4'>Check out</span>
            <input placeholder='Leaving date' type='text' required className='input-area border-none' onFocus={(e) => (e.target.type = "date")} onChange={(e)=>setCheckOut(e.target.value)} value={checkOut} min={checkIn?addDaysToStateFormat(checkIn,1):format(Date.now(),"yyyy-MM-dd")}/>
          </div>
          <div className='flex flex-col border-l max-md:border-none w-full px-2'>
          <span className='text-sm font-bold px-4'>Guests</span>
            <input placeholder='Number of guests' type='number' className='border-none' required min={1} value={guests} onChange={(e)=> setGuests(e.target.value)}/>
          </div>
          </div>
          <button className='bg-primary text-white rounded-full h-10 md:h-16 w-full md:w-16 flex justify-center items-center' onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </form>
        {!allInputValid && <p className="text-red-800 text-center">All input items must be filled out.</p>}
    </div>
  )
}

export default NavbarSearch