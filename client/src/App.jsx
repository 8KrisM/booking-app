import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Login from './pages/Login'
import Layout from './Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/Account'
import Places from './components/Places'
import PlacesForm from './components/PlacesForm'
import Place from './pages/Place'
import Bookings from './components/Bookings'
import Booking from './components/Booking'
import { useLoadScript } from '@react-google-maps/api'
import RequireAuth from './components/RequiredAuth'
import Search from './pages/Search'
import { SearchContextProvider } from './SearchContext'

axios.defaults.baseURL= import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

function App() {

const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
    language: 'en'
  });

  return (
    <UserContextProvider>
      <SearchContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route index element={<IndexPage/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/account' element={<RequireAuth><Account/></RequireAuth>}/> 
            <Route path='/account/places' element={<RequireAuth><Places/></RequireAuth>}/>  
            <Route path='/account/places/new' element={<RequireAuth><PlacesForm/></RequireAuth>}/> 
            <Route path='/account/places/:id' element={<RequireAuth><PlacesForm/></RequireAuth>}/> 
            <Route path='/place/:id' element={<Place/>}/> 
            <Route path='/account/bookings' element={<RequireAuth><Bookings/></RequireAuth>}/> 
            <Route path='/account/bookings/:id' element={<RequireAuth><Booking/></RequireAuth>}/>
            <Route path='/search' element={<Search/>}/> 
          </Route>
        </Routes>
      </SearchContextProvider>
    </UserContextProvider>
    
  )
}

export default App
