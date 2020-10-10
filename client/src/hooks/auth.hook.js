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
        setToken(null)
        setUserId(null)
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
    }, [])



    useEffect(() => {
        const storageToken = localStorage.getItem("token") || null
        const storageUserId = localStorage.getItem("userId") || null
        if (!token && !userId){
            login(storageToken, storageUserId)
        }
    },[login,token,userId])

    return {token, userId, login, logout,isAuthenticated}

}