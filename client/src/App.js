import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import 'materialize-css'
import {UserContext} from "./context/UserContext";
import {useHttp} from "./hooks/http.hook";


function App() {

    const {token, login, userId, logout} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    const [users, setUsers] = useState([]);
    const {request} = useHttp();
    useEffect(() => {
        request('api/users', 'GET')
            .then(setUsers)
            .catch(() => {
                setUsers([])
            })
    }, [])

    return (
        <AuthContext.Provider value={
            {token, logout, login, userId, isAuthenticated}
        }>
            <UserContext.Provider value={users}>
                <Router>
                    {isAuthenticated && <Navbar/>}
                    <div>
                        {routes}
                    </div>
                </Router>
            </UserContext.Provider>
        </AuthContext.Provider>

    );
}

export default App
