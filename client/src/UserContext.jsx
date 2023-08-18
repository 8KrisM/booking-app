import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {data} from "autoprefixer";
import { Navigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  const [redirect, setRedirect] = useState(null)
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({data}) => {
        setUser(data);
        setReady(true);
        setRedirect(null)
      });
    }
  }, []);

  const  logout = async () =>{
      await axios.post('/logout')
      setRedirect('/')
      setUser(null)
  }
  
  if(!ready){
      return 'Loading...'
  }

  /*if(redirect){
    <Navigate to={redirect}/>
  }*/



  return (
    <UserContext.Provider value={{user,setUser,ready, logout}}>
      {children}
    </UserContext.Provider>
  );
}