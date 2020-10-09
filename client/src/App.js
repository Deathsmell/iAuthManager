import React, {useEffect} from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import 'materialize-css'


function App() {
    console.log("App mount")
    const {token, login, userId, logout, isAuthenticated} = useAuth()
    const routes = useRoutes(isAuthenticated)

    useEffect(() => {
        if (token === null) {
            localStorage.removeItem("token")
        }
    }, [token])

    return (
        <AuthContext.Provider value={
            {token, logout, login, userId, isAuthenticated}
        }>
            <Router>
                {isAuthenticated && <Navbar/>}
                <div>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App
