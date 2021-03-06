import {createContext} from 'react'
import noop from '../util/noop'


export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
})