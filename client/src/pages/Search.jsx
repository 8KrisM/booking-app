import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PlaceCard from '../components/PlaceCard'

const Search = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(document.location.search)
  const lat= parseFloat(searchParams.get("lat"))
  const lng= parseFloat(searchParams.get("lng"))
  const checkIn= searchParams.get("checkIn")
  const checkOut= searchParams.get("checkOut")
  const guests= searchParams.get("guests")

  console.log(lat,lng)
  const [places, setPlaces] = useState({})

  useEffect(()=>{
    axios.post('/places-search',{lat,lng,checkIn,checkOut,guests}).then(({data})=>{
      setPlaces(data)
  })
  },[location.search])

  return (
    <div className='mt-10 grid gap-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 animate-slide-down'>
      {places.length >0 && places.map(place=>(
        <PlaceCard place={place} key={place._id}/>
      ))}
  </div>
  )
}

export default Search