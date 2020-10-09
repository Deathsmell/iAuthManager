import {useState, useCallback, useEffect,} from 'react'
import {useHttp} from "./http.hook";


export const useAuth = () => {

    const {request} = useHttp()
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isAuthenticated, setAuthenticate] = useState(false)

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

    useEffect(()=>{
        if (!isAuthenticated && token){
            request('api/auth','POST',null,{Authorization: `Bearer ${token}`})
                .then(resp => {
                    console.log(resp)
                    if (!!resp.isAuthenticated){
                        setAuthenticate(true)
                    } else {
                        localStorage.removeItem("token")
                    }
                }).catch(reason => {
                console.log(reason);
            })
        }
    },[isAuthenticated,token])

    useEffect(() => {
        const storageToken = localStorage.getItem("token") || null
        const storageUserId = localStorage.getItem("userId") || null
        console.log("Auto login checking")

        if (!token && !userId){
            console.log("Auto login start")
            login(storageToken, storageUserId)
        }
    })

    return {token, userId, login, logout,isAuthenticated}

}