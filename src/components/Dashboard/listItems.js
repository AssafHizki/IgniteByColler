import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
        <ListItem button>
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
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Powers" />
        </ListItem>
        <ListItem button onClick={() => browserHistory.push("/fields")}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Fields" />
        </ListItem>
        <ListItem button onClick={() => browserHistory.push("/pitch")}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Pitch" />
        </ListItem>
        <ListItem button onClick={() => browserHistory.push("/personaldetails")}>
            <ListItemIcon>
                <AssignmentIcon />
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