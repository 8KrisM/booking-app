import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PlaceImg from '../components/PlaceImg'
import PlaceCard from '../components/PlaceCard'

const IndexPage = () => {
  const [places, setPlaces] = useState([])
  useEffect(()=>{
    axios.get('/places').then((res)=>{
      setPlaces(res.data)
    })
  },[])
  return (
    <div className='mt-10 grid gap-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 animate-slide-down'>
      {places.length >0 && places.map(place=>(
        <PlaceCard place={place} key={place._id}/>
      ))}
    </div>
    
  )
}

export default IndexPage