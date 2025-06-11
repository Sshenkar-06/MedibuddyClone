import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children})=> {
     const[isAuthenticated,setIsAuthenticated] = useState(false);
     const [userId,setUserId] = useState("");
  
     useEffect(()=> {
        const flag =  localStorage.getItem("isLoggedIn");
        if(flag){
            setIsAuthenticated(true);
        }

        const userId = localStorage.getItem("userId");
        if(userId){
            setUserId(userId);
        }
     },[])

     const login = (userId) => {
        localStorage.setItem("isLoggedIn",true);
        setIsAuthenticated(true);
        
        //set userId in local storage
        localStorage.setItem("userId",userId);
        setUserId(userId);
     };

     const logout = () => {

     }


    return (
        <>
           <AuthContext.Provider value={{isAuthenticated,login,logout,userId}}>
              {children}
            </AuthContext.Provider>
        </>
    )

}

export default AuthProvider;
