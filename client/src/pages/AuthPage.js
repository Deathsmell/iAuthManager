import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import './AuthPage.css'

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const message = useMessage()
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        const data = await request('/api/signup', 'POST', {...form})
        message(data.message)
    }


    const loginHandler = async () => {
        const data = await request('/api/login', 'POST', {...form})
        if (data) {
            auth.login(data.token, data.id)
        } else {
            // message("Not response")
        }
    }

    return (
        <div className="col xl12 l12 m12 s12">
            <div className="row">
                <div className="col xl6 offset-xl3 l8 offset-l2 m8 offset-m2 s10 offset-s1">
                    <div className="row">
                        <div className="card cyan darken-4">
                            <div className="auth-panel card-content white-text hoverable ">
                            <span className="card-title center-align">
                                <h5 className="auth-logo">Authentication</h5></span>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="email"
                                                   type="email"
                                                   className="validate"
                                                   name="email"
                                                   onChange={changeHandler}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="password"
                                                   type="password"
                                                   className="validate"
                                                   name="password"
                                                   onChange={changeHandler}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>

                            </div>
                            <div className="card-action row">
                                <div className="col s1"/>
                                <button className="btn-large  cyan darken-2 col s4"
                                        onClick={loginHandler}
                                        disabled={loading}
                                >
                                    <h6 style={{color: 'black'}}>Sign in</h6>
                                </button>
                                <div className="col s2"/>
                                <button
                                    className="btn-large  cyan darken-2 col s4"
                                    onClick={registerHandler}
                                    disabled={loading}
                                >
                                    <h6 style={{color: 'black'}}>Sign up</h6>
                                </button>
                                <div className="col s1"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}