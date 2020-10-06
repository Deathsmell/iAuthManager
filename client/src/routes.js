import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import {ListUsers} from "./pages/ListUsers";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/list" exact>
                    <ListUsers/>
                </Route>
                <Redirect to="/list"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/list"/>
        </Switch>
    )

}