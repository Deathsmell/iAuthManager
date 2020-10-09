import React from "react"
import {Route, Switch} from "react-router-dom"
import ListUsers from "./pages/ListUsers"
import {AuthPage} from "./pages/AuthPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/list" exact>
                    <ListUsers/>
                </Route>
                <Route path="*">
                    <ListUsers />
                </Route>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="*">
                <AuthPage />
            </Route>
        </Switch>
    )
}
