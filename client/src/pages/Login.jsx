import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext)
    const handleLogin = async (e) =>{
        e.preventDefault()
        try {
            const {data} = await axios.post('/login', {email, password})
            setUser(data)
            setRedirect(true)
        } catch (error) {
            console.log(error)
            alert('Login failed.')
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='-mt-32'>
            <h1 className='text-4xl text-center mb-4'>Login</h1>
            <form className='max-w-md mx-auto' onSubmit={handleLogin}>
                <input type='email' placeholder='Email' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}/>
                <input type='password' placeholder='Password'
                    value={password} 
                    onChange={e => setPassword(e.target.value)}/>
                <button className='primary'>
                    Login
                </button>
                <div className='text-center py-1.5'>
                    No account? <Link to={"/register"} className='text-primary underline'> Register</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login