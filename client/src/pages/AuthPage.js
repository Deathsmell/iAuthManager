import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

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
        try {
            const data = await request('/api/auth/registration', 'POST', {...form})
            message(data.message)
        } catch (e) {
            // empty
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.id)
        } catch (e) {
            // empty
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title center-align">Authentication</span>
                        <div className="">

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
                    </div>
                    <div className="card-action center-align">
                        <button className="btn yellow darken-3"
                                style={{marginRight: 20}}
                                onClick={loginHandler}
                                disabled={loading}
                        >
                            Sign in
                        </button>

                        <button
                            className="btn grey darken-3"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}