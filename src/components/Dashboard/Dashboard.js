import * as React from 'react';
import Grid from '@mui/material/Grid';
import DrawerWithChildren from './Drawer';
import StickyNote from './StickyNote';
import { UserContext } from '../../AuthContext';
import { getData } from '../../firebase/functions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

const getParams = (str) => {
    const current_url = new URL(window.location.href);
    const search_params = current_url.searchParams;
    return search_params.get(str);
}

export default function Dashboard(props) {

    const user = React.useContext(UserContext);
    const [users, setUsers] = React.useState([]);
    const [displayUsers, setDisplayUsers] = React.useState([]);
    const [radioButtons, setRadioButtons] = React.useState({ showTeams: true, showPlayers: true });
    const openNoteID = getParams("ni");

    React.useEffect(() => {
        async function _getData() {
            getData().then(usersData => { setUsers(usersData); setDisplayUsers(usersData) })
                .catch(e => console.log(e))
        }

        if (user) {
            _getData();
        }

    }, [user])

    const handleFilterChange = async (type) => {
        let filterPlayers = !radioButtons.showPlayers;
        let filterTeams = !radioButtons.showTeams;

        if (type === "showPlayers") {
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
            <Typography variant="h6" style={{ marginLeft: '10%' }}>
                Filters
            </Typography>
            <Grid container key="RadioButtons" style={{ margin: 10, padding: 5, justifyContent: 'space-evenly' }}>
                <FormControlLabel
                    control={<Checkbox checked={radioButtons.showPlayers} color="primary" onClick={() => { handleFilterChange("showPlayers") }} />}
                    label="Show co-founders looking to join a Venture team"
                    style={{ marginRight: 25 }}
                />
                <FormControlLabel
                    control={<Checkbox checked={radioButtons.showTeams} color="primary" onClick={() => { handleFilterChange("showTeams") }} />}
                    label="Show Venture teams looking for co-founders"
                />
            </Grid>
            <Divider sx={{ m: 2, borderBottom: 1, width: '76vw' }} />
            {displayUsers.map((userNote, index) => {
                return (
                    <Grid item xs={12} md={4} lg={3} key={index}>
                        <StickyNote userNote={userNote} openDialog={userNote.id === openNoteID} />
                    </Grid>
                )
            })}
        </DrawerWithChildren>
    );
}
