import * as React from 'react';
import Grid from '@mui/material/Grid';
import DrawerWithChildren from './Drawer';
import StickyNote from './StickyNote';
import browserHistory from '../../routes/history';
import { UserContext } from '../../AuthContext';
import { getData } from '../../firebase/functions';
import { Divider, Typography } from '@mui/material';

export default function Dashboard(props) {

    const user = React.useContext(UserContext);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        if (!user) {
            browserHistory.push("/");
        }

        async function _getData() {
            getData().then(usersData => { setUsers(usersData.filter(u => user.contacts.includes(u.id))); })
                .catch(e => console.log(e))
        }

        if (user) {
            _getData();
        }

    }, [user])

    let usersAddressedMe = users.filter(u => u.addressedMe);
    let usersIContacted = users.filter(u => !u.addressedMe);

    return (
        <DrawerWithChildren >
            {
                usersAddressedMe.length > 0 &&
                <div>
                    <Typography variant="h5">
                        Addressed me
                    </Typography>
                    {usersAddressedMe.map((userNote, index) => {
                        if (userNote.addressedMe) {
                            return (
                                <Grid item xs={12} md={4} lg={4} key={index}>
                                    <StickyNote userNote={userNote} />
                                </Grid>
                            )
                        }
                    })}
                </div>
            }
            <Divider orientation="horizontal" sx={{ maring: 5 }} style={{ border: 1 }} />
            {
                usersIContacted.length > 0 &&
                <div>
                    <Typography variant="h5">
                        My contacts
                    </Typography>
                    {usersIContacted.map((userNote, index) => {
                        if (!userNote.addressedMe) {
                            return (
                                <Grid item xs={12} md={4} lg={4} key={"usersIContacted" + index}>
                                    <StickyNote userNote={userNote} />
                                </Grid>
                            )
                        }
                    })}
                </div>
            }

        </DrawerWithChildren>
    );
}
