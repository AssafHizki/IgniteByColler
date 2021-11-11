import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp/";
import SignUpDetails from "../components/SignUp/SignUpDetails";
import Dashboard from "../components/Dashboard/Dashboard";
import Contacts from "../components/Dashboard/Contacts";
import LogOut from '../components/LogOut';
import Powers from '../components/Profile/Powers';
import Fields from '../components/Profile/Fields';
import Pitch from '../components/Profile/Pitch';
import PersonalDetails from '../components/Profile/PersonalDetails';

export const Component = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default function Routes() {

    return (
        <Switch>
            <Route path="/signin">
                <SignIn />
            </Route>
            <Route path="/signup" exact>
                <SignUp />
            </Route>
            <Route path="/logout">
                <LogOut />
            </Route>

            <Route path="/signup/details">
                <SignUpDetails />
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/contacts">
                <Contacts />
            </Route>
            <Route path="/" exact>
                <SignIn />
            </Route>
            <Route path="/skills" exact>
                <Powers />
            </Route>
            <Route path="/verticals" exact>
                <Fields />
            </Route>
            <Route path="/pitch" exact>
                <Pitch />
            </Route>
            <Route path="/personaldetails" exact>
                <PersonalDetails />
            </Route>
            <Route path="*">
                <SignIn />
            </Route>
        </Switch>
    );
}
