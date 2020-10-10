import {useState, useCallback, useEffect,} from 'react'
import {useHttp} from "./http.hook";


export const useAuth = () => {

    const {request} = useHttp()
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isAuthenticated, setAuthenticate] = useState(false)

    useEffect(()=>{
        if (!isAuthenticated && token){
            request('api/auth','POST',null,{Authorization: `Bearer ${token}`})
                .then(resp => {
                    if (!!resp.isAuthenticated){
                        setAuthenticate(true)
                    } else {
                        localStorage.removeItem("token")
                    }
                })
                .catch(console.error)
        }
    },[isAuthenticated,token,request])

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem("userId", id)
        localStorage.setItem("token", jwtToken)
    }, [])

    const logout = useCallback(() => {
        console.log("I remove TOKEN")
        setToken(null)
        setUserId(null)
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
    }, [])



    useEffect(() => {
        const storageToken = localStorage.getItem("token")
        const storageUserId = localStorage.getItem("userId")
        if (!token){
            login(storageToken, storageUserId)
        }
    },[login,token,userId])

    return {token, userId, login, logout,isAuthenticated}

}