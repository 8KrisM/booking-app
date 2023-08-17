import {createContext, useEffect, useState} from "react";
import { addDays, format } from 'date-fns'

export const SearchContext = createContext({});

export function SearchContextProvider({children}) {
    const [address, setAddress] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [selected, setSelected] = useState({
        lat:'',
        lng: ''
    })
    const [guests, setGuests] = useState('')
    const [allInputValid, setAllInputValid] = useState(true)

    const addDaysToStateFormat= (date, days) =>{
        return format(addDays(new Date(date),days),'yyyy-MM-dd')
    }

    useEffect(()=>{
        if(new Date(checkIn)>=new Date(checkOut)) setCheckOut(addDaysToStateFormat(checkIn,1))
    },[checkIn])

  return (
    <SearchContext.Provider value={{address,checkIn, checkOut, selected, guests, allInputValid, setAddress,setCheckIn,setCheckOut,setSelected,setGuests,setAllInputValid, addDaysToStateFormat}}>
      {children}
    </SearchContext.Provider>
  );
}