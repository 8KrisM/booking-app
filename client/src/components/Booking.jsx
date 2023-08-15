import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Address from './Address'
import PlaceGallery from './PlaceGallery'
import {format, differenceInCalendarDays} from 'date-fns'

const Booking = () => {
    const {id} = useParams()

    const [booking, setBooking] = useState(null)

    useEffect(()=>{
        if(id){
            axios.get('/bookings').then(response=>{
                const foundBooking = response.data.find(({_id})=> _id === id)
                if(foundBooking){
                    setBooking(foundBooking)
                }
            })
        }
    },[id])

    if(!booking){
        return "Loading"
    }


  return (
    <div className='my-7'>
        <h1 className='text-3xl'>{booking.place.title}</h1>
        <Address place={booking.place}/>
        <div className='bg-gray-200 p-4 mb-4 rounded-2xl'>
            <h2 className='text-xl'>Booking informations: </h2>
            <div className='py-3'>
            <div>
                {format(new Date(booking.checkIn), 'dd.MM.yyyy') } &rarr; {format(new Date(booking.checkOut), 'dd.MM.yyyy')}
            </div>
            <div>
                <b>Total price:</b> ${booking.price}
            </div>
            <div>
                <b>Number of nights:</b> {differenceInCalendarDays(new Date(booking.checkIn), new Date(booking.checkOut))*-1}
            </div>
        </div>
        </div>
        <PlaceGallery place={booking.place}/>
    </div>
  )
}

export default Booking