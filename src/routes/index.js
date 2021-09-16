import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp/";
import SignUpDetails from "../components/SignUp/SignUpDetails";
import Dashboard from "../components/Dashboard/Dashboard";

export default function Routes() {
    const [user, setUser] = useState();

    return (
        <Switch>
            <Route path="/signin">
                <SignIn setUser={setUser} />
            </Route>
            <Route path="/signup" exact>
                <SignUp />
            </Route>
            <Route path="/signup/details">
                <SignUpDetails />
            </Route>
            <Route path="/dashboard">
                <Dashboard user={user} />
            </Route>
            <Route path="/">
                <SignIn setUser={setUser} />
            </Route>
        </Switch>
    );
}
