import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {AuthContext} from "../context/AuthContext";
import "./Navbar.css"

export const Navbar = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <span className="brand-logo logo"><i className="material-icons">cloud</i>Auth manger</span>
                <ul className="right hide-on-med-and-down">
                    <li>
                        <a className="logout-btn" href="/" onClick={logoutHandler}>
                            <i className="material-icons center">exit_to_app</i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}