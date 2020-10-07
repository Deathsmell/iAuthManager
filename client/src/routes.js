import React from "react"
import {Switch, Route} from "react-router-dom"
import ListUsers from "./pages/ListUsers"
import {AuthPage} from "./pages/AuthPage"
import TestPage from "./pages/TestPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/list" exact>
                    <ListUsers/>
                </Route>
                <Route path="/test" exact>
                    <TestPage/>
                </Route>
                <Route path="*">
                    <ListUsers />
                </Route>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Route path="*">
                <AuthPage />
            </Route>
        </Switch>
    )
}
