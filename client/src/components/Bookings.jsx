import React, { useEffect, useState } from 'react'
import AccountNav from './AccountNav'
import axios from 'axios'
import PlaceImg from './PlaceImg'
import { differenceInCalendarDays, format } from 'date-fns'
import { Link } from 'react-router-dom'

const Bookings = () => {
    const [bookings, setBookings] = useState([])

    useEffect(()=>{
        axios.get('/bookings').then(res=>{
            setBookings(res.data)
        })
    },[])

  return (
    <div>
        <AccountNav />
        <div className='flex flex-col justify-center items-center animate-slide-down'>
            {bookings?.length > 0 && bookings.map((booking)=>(
                <Link key={booking._id} to={'/account/bookings/'+booking._id} className='flex flex-col md:flex-row gap-4 bg-gray-100 rounded-2xl overflow-hidden w-[90%] p-2 mb-3'>
                    <div className='hover:bg-gray-500 rounded-2xl flex justify-center w-full md:w-48'>
                        <PlaceImg className= 'rounded-2xl' place={booking.place}/>
                    </div>
                    <div className='py-1 md:py-3'>
                        <h2 className='text-xl font-semibold'>{booking.place.title}</h2>
                        <div>
                            <b>In:</b>{format(new Date(booking.checkIn), 'dd.MM.yyyy') } <b>Out:</b> {format(new Date(booking.checkOut), 'dd.MM.yyyy')}
                        </div>
                        <div>
                            <b>Total price:</b> ${booking.price}
                        </div>
                        <div>
                            <b>Nights:</b> {differenceInCalendarDays(new Date(booking.checkIn), new Date(booking.checkOut))*-1}
                        </div>
                    </div>
                    
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Bookings