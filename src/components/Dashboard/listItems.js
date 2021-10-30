import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PowerIcon from '@mui/icons-material/SupervisorAccount';
import FieldIcon from '@mui/icons-material/Assignment';
import PitchIcon from '@mui/icons-material/Speaker';
import DetailsIcon from '@mui/icons-material/Person';
import LogOutIcon from '@mui/icons-material/Logout';
import browserHistory from '../../routes/history';

export const mainListItems = (
    <div>
        <ListItem button onClick={() => browserHistory.push("/dashboard")}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => browserHistory.push("/contacts")}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>My Profile</ListSubheader>
        <ListItem button onClick={() => browserHistory.push("/powers")}>
            <ListItemIcon>
                <PowerIcon />
            </ListItemIcon>
            <ListItemText primary="Powers" />
        </ListItem>
        <ListItem button onClick={() => browserHistory.push("/fields")}>
            <ListItemIcon>
                <FieldIcon />
            </ListItemIcon>
            <ListItemText primary="Fields" />
        </ListItem>
        <ListItem button onClick={() => browserHistory.push("/pitch")}>
            <ListItemIcon>
                <PitchIcon />
            </ListItemIcon>
            <ListItemText primary="Pitch" />
        </ListItem>
        <ListItem button onClick={() => browserHistory.push("/personaldetails")}>
            <ListItemIcon>
                <DetailsIcon />
            </ListItemIcon>
            <ListItemText primary="Personal Details" />
        </ListItem>
        <ListItem button onClick={() => browserHistory.push("/logout")}>
            <ListItemIcon>
                <LogOutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
        </ListItem>
    </div>
);