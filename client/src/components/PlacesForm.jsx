import React, { useEffect } from 'react'
import { useState } from 'react'
import PhotoUpload from './PhotoUpload'
import Perks from './Perks'
import AccountNav from './AccountNav'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {MapAndSearch} from './Map'




const PlacesForm = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [latLng, setLatLng] = useState({
        lat:0,
        lng: 0
    })
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [addedPhotos, setAddedPhotos] = useState([])
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false)

    console.log(checkIn)

    useEffect(()=>{
        if(!id) return
        axios.get('/places/'+id).then(response=>{
            const {data} = response
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
            setLatLng({lat: data.lat, lng: data.lng})
        })
    },[id])

    const inputHeader = (value) => {
        return <h2 className="text-2xl mt-4">{value}</h2>
    }

    const inputDesc = (value) => {
        return <p className="text-gray-600 text-sm">{value}</p>
    }

    const savePlace = async (e) =>{
        e.preventDefault()
        const placeData= {
            title, address,lat: latLng.lat,lng: latLng.lng, 
            addedPhotos, description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price
        }
        if(id){
            await axios.put('/places', {id,...placeData})
        }
        else{
            await axios.post('/places', placeData)
        }
        setRedirect(true)
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

  return (
    <div>
        <form onSubmit={savePlace}>
            {inputHeader("Title")}
            {inputDesc("Title for your place")}
            <input 
                type="text" 
                placeholder="Title (e.g. My apartment by the sea)"
                value={title}
                onChange={e=> setTitle(e.target.value)}
                required
                />
            {inputHeader("Address")}
            {inputDesc("Address of your accomodation")}
        
                <div className='flex justify-center items-center h-80 w-full roudned-2xl'>
                    <MapAndSearch setAddress={setAddress} address={address} setSelected={setLatLng} selected={latLng}/>
                </div>
                
            {inputHeader("Photos")}
            {inputDesc("Show the beauty of your accomodation")}
            <PhotoUpload addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            {inputHeader("Description")}
            {inputDesc("Describe your accomodation")}
            <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                required
                />
            {inputHeader("Perks")}
            {inputDesc("Select everything that matches")}
            <Perks selected={perks} onChange={setPerks}/>
            {inputHeader("Extra info")}
            {inputDesc("House rules, surroundings...")}
            <textarea
                value={extraInfo} 
                onChange={e => setExtraInfo(e.target.value)}
                />
            {inputHeader("Check in & out times and guests")}
            {inputDesc("Add check in and out times and maximum number of guests")}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                <div>
                    <h3 className="mt-2 -mb-1">Check in time</h3>
                    <input 
                        type="time" 
                        placeholder="14:00"
                        value={checkIn} 
                        onChange={e => setCheckIn(e.target.value)}
                        className='input-area'
                        required
                        />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Check out time</h3>
                    <input 
                        type="time" 
                        placeholder="10:00"
                        value={checkOut} 
                        className='input-area'
                        onChange={e => setCheckOut(e.target.value)}
                        required
                        />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Max guests</h3>
                    <input 
                        type="number" 
                        placeholder="2"
                        value={maxGuests} 
                        onChange={e => setMaxGuests(e.target.value)}
                        required
                        min='1'
                        max='100'
                        />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Price per night</h3>
                    <input 
                        type="number" 
                        placeholder="2"
                        value={price} 
                        onChange={e => setPrice(e.target.value)}
                        required
                        min='0'
                        />
                </div>
            </div>
            <button className="primary my-4">
                Submit accomodation
            </button>
        </form>
    </div>
  )
}

export default PlacesForm