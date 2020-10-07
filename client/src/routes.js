import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import ListUsers from "./pages/ListUsers";
import {AuthPage} from "./pages/AuthPage";
import TestPage from "./pages/TestPage";

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
                <Redirect to="/list"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage/>
                </Route>
                <Redirect to="/list"/>
            </Switch>
        )
    }

}