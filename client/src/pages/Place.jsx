import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget'
import PlaceGallery from '../components/PlaceGallery'
import Address from '../components/Address'

const Place = () => {
    const {id} = useParams()
    const [place, setPlace] = useState(null)


    useEffect(()=>{
        if(!id) return
        axios.get('/places/'+id).then(res=>{
            setPlace(res.data)
        })
    },[id])

    if(!place){
        return 'Loading'
    }


  return (
    <div className='mt-5 -m-6 px-6 pt-6 dark:bg-darkPick'>
        <h1 className='text-2xl'>
            {place.title}
        </h1>
        <Address place={place}/>
        <PlaceGallery place={place}/>
    
        <div className='mt-7 mb-4 grid gap-6  grid-cols-1 md:grid-cols-[2fr_1fr]'>
            <div>
                <div className='my-4'>
                    <h2 className='font-semibold text-2xl'>Description</h2>
                    {place.description}
                </div>
                <b>Check-in: </b>{place.checkIn}:00<br/>
                <b>Check-out: </b>{place.checkOut}:00<br/>
                <b>Max guests: </b>{place.maxGuests}
                
            </div>
            <BookingWidget place={place}/>
        </div>
        <div className="bg-white dark:bg-bgDark -mx-6 px-6 py-8 border-t dark:border-none">
            <div>
                <h2 className='font-semibold text-2xl'>Extra info</h2>
            </div>
            <div className='mb-2 mt-2 text-sm leading-5'>
                    {place.extraInfo}
            </div>
        </div>
    </div>
  )
}

export default Place