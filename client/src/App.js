import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import 'materialize-css'
import {UserContext} from "./context/UserContext";

const users = [
    {id: 12, name: 'Mets', date: Date.now()},
    {id: 23, name: 'Bast', date: Date.now()},
    {id: 34, name: 'Past', date: Date.now()},
    {id: 45, name: 'Karl', date: Date.now()},
    {id: 67, name: 'Wendi', date: Date.now()},
]

function App() {
    const {token, login, userId, logout} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
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
