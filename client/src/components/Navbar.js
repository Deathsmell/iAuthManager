import React, {useContext} from "react"
import {AuthContext} from "../context/AuthContext";
import "./Navbar.css"

export const Navbar = () => {

    const {logout} = useContext(AuthContext)

    return (
            <nav>
                <div className="nav-wrapper cyan darken-4">
                    <span className="brand-logo logo white-text lighten-1"><i
                        className="material-icons icon-color">cloud</i>Auth manger</span>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <a className="logout-btn" href="/" onClick={logout}>
                                <i className="material-icons center icon-color lighten-1">exit_to_app</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
    )
}