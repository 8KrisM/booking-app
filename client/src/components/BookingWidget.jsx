import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import {differenceInCalendarDays} from 'date-fns'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [guests, setGuests] = useState(1)
    const [redirect, setRedirect] = useState('')

    const {user} = useContext(UserContext)

    useEffect(()=>{
        if(user) setName(user.name)
    },[user])

    let numberOfDays= 0

    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkIn),new Date(checkOut))*-1
    }

    const bookPlace = async () =>{
        const data = {checkIn, checkOut, 
            guests, name, phone, 
            place: place._id, price: numberOfDays*place.price}
        try{
            const res = await axios.post('/bookings', data)
            const bookingId = res.data._id
            setRedirect('/account/bookings/'+bookingId)
        }
        catch(error){
            if(error.response.status===401)alert("Not logged in")
            else alert("Error while booking")
        }
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

  return (
    <div>
        <div className=' border p-4 rounded-2xl shadow'>
            <div className='text-xl text-center p-1'>
            <b>Price:</b> ${place.price} / per night
            </div>
            <div className='border border-primary rounded-2xl'>
                <div className='flex flex-col md:flex-row'>
                    <div className=' p-4 rounded-2xl'>
                        <label>Check-in: </label>
                        <input className='bg-transparent border border-gray-200 rounded-2xl p-0.5' 
                            value={checkIn} type='date' onChange={(e)=>setCheckIn(e.target.value)}/>
                    </div>
                    <div className=' p-4  rounded-2xl border-l'>
                        <label>Check-out: </label>
                        <input className='bg-transparent border border-gray-200 rounded-2xl p-0.5' 
                            value={checkOut} type='date' onChange={(e)=>setCheckOut(e.target.value)}/>
                    </div>
                </div>
                <div className=' p-4  rounded-2xl border-t'>
                        <label>Guests: </label>
                        <input className='bg-transparent' 
                            value={guests} type='number' min='0' max='50' onChange={(e)=>setGuests(e.target.value)}/>
                </div>
                {numberOfDays > 0 && (
                    <div className=' p-4  rounded-2xl border-t'>
                    <label>Full name: </label>
                    <input className='bg-transparent' 
                        value={name} type='text' placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
                     <label>Phone number: </label>
                     <input className='bg-transparent' 
                        value={phone} type='tel' placeholder='Phone' onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                    
                )}
            </div>
            
            <button onClick={bookPlace} className='primary mt-4'>Book now {numberOfDays > 0 && (
                <span>${numberOfDays * place.price}</span>
            )}</button>
        </div>
    </div>
  )
}

export default BookingWidget