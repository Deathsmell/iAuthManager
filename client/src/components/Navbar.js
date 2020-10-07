import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {AuthContext} from "../context/AuthContext";
import 'material-design-icons'


export const Navbar = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }

    return(
        <nav>
            <div className="nav-wrapper">
                <span className="brand-logo"><i className="material-icons">cloud</i>Auth manger</span>
                <ul className="right hide-on-med-and-down">
                    <li><a href="/" onClick={logoutHandler}><i className="material-icons">exit_to_app</i></a></li>
                </ul>
            </div>
        </nav>
    )
}