import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import 'materialize-css'
import './index.css'


function App() {
    const {token, login, userId, logout, isAuthenticated} = useAuth()
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={
            {token, logout, login, userId, isAuthenticated}
        }>
            <Router>
                <div className="fullscreen cyan lighten-5 row">
                    {isAuthenticated && <Navbar/>}
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App
