import * as React from 'react';
import Grid from '@mui/material/Grid';
import DrawerWithChildren from './Drawer';
import StickyNote from './StickyNote';
import browserHistory from '../../routes/history';
import { UserContext } from '../../AuthContext';
import { getData } from '../../firebase/functions';

export default function Dashboard(props) {

    const user = React.useContext(UserContext);
    const [users, setUsers] = React.useState([]);
    const [displayUsers, setDisplayUsers] = React.useState([]);
    const [radioButtons, setRadioButtons] = React.useState({ showTeams: true, showPlayers: true });


    React.useEffect(() => {
        if (!user) {
            browserHistory.push("/");
        }

        async function _getData() {
            getData().then(usersData => { setUsers(usersData); setDisplayUsers(usersData) })
                .catch(e => console.log(e))
        }

        if (user) {
            _getData();
        }

    }, [user])

    const handleClick = async (e) => {
        let filterPlayers = !radioButtons.showPlayers;
        let filterTeams = !radioButtons.showTeams;

        if (e.target.name === "showPlayers") {
            filterPlayers = radioButtons.showPlayers;
            setRadioButtons({ ...radioButtons, showPlayers: !radioButtons.showPlayers });
        }
        else {
            filterTeams = radioButtons.showTeams;
            setRadioButtons({ ...radioButtons, showTeams: !radioButtons.showTeams });
        }

        setDisplayUsers(users.filter(u => {

            if (filterPlayers) {
                return u.type === "team";
            }
            if (filterTeams) {
                return u.type === "single";
            }

            return true;
        }));

    }

    return (
        <DrawerWithChildren >
            <Grid container key="RadioButtons">
                <input type="radio" name="showPlayers" checked={radioButtons.showPlayers} onClick={handleClick} /> Show players looking for a team
                <input type="radio" name="showTeams" checked={radioButtons.showTeams} onClick={handleClick} /> Show teams looking for players
            </Grid>

            {displayUsers.map((userNote, index) => {
                return (
                    <Grid item xs={12} md={4} lg={3} key={index}>
                        <StickyNote userNote={userNote} />
                    </Grid>
                )
            })}
        </DrawerWithChildren>
    );
}
