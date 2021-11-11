import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SkillsIcon from '@mui/icons-material/Adb';
import VerticalsIcon from '@mui/icons-material/CheckBox';
import PitchIcon from '@mui/icons-material/Mic';
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
            <ListItemText primary="My Contacts" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset style={{ textAlign: 'start ' }}>My Profile</ListSubheader>
        <ListItem button onClick={() => browserHistory.push("/skills")}>
            <ListItemIcon>
                <SkillsIcon />
            </ListItemIcon>
            <ListItemText primary="Skills" />
        </ListItem>
        <ListItem button onClick={() => browserHistory.push("/verticals")}>
            <ListItemIcon>
                <VerticalsIcon />
            </ListItemIcon>
            <ListItemText primary="Verticals" />
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
            <ListItemText primary="My Account" />
        </ListItem>
        <ListItem button onClick={() => browserHistory.push("/logout")}>
            <ListItemIcon>
                <LogOutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
        </ListItem>
    </div>
);