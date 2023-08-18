import { Link, Navigate, useParams } from "react-router-dom"
import AccountNav from "./AccountNav"
import { useEffect, useState } from "react"
import axios from "axios"
import PlaceImg from "./PlaceImg"

const Places = () => {
    const [places, setPlaces] = useState([])
    useEffect(()=>{
        axios.get('/user-places').then(({data})=>{
            setPlaces(data)
        })
    },[])

  return (
    <div>
        <div className="animate-slide-down mt-10">
            <div className="text-center">

                <Link className="bg-primary text-white rounded-full py-2 px-6 text-center" to='/account/places/new'> 
                    <span className="font-bold">+ </span>  Add new accommodation
                </Link>
            </div>
            <div className="mt-4">
                {places.length>0&& places.map(place=>(
                    <Link to={'/account/places/'+place._id} key={place._id} className="flex mt-5 cursor-pointer gap-4 bg-gray-100 dark:bg-darkPick p-3 rounded-2xl">
                        <div className="flex w-32 h-32 rounded-xl shrink-0">
                            <PlaceImg place={place}/>
                        </div>
                        <div className="grow-0 shrink mr-2 truncate">
                            <h2 className="text-xl font-semibold truncate">{place.title}</h2>
                            <p className="text-sm mt-3 truncate">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Places