import React from 'react'
import { Link } from 'react-router-dom'
import PlaceImg from './PlaceImg'

const PlaceCard = ({place}) => {
  return (
    <Link to={'/place/'+place._id} key={place.title} className='hover:bg-gray-100 dark:hover:bg-darkPick hover:scale-105 hover:p-1  cursor-pointer rounded-2xl'>
          <div className='hover:bg-gray-500 rounded-2xl mb-2 flex justify-center w-full'>
            <PlaceImg place={place} className='rounded-2xl aspect-square object-cover'/>
          </div>
            <h3 className='font-semibold truncate'>{place.address}</h3>
            <h2 className='text-sm truncate text-gray-600'>{place.title}</h2>
            <div className='mt-2'>
              <span className='font-semibold'>${place.price}</span> per night
            </div>
        </Link>
  )
}

export default PlaceCard