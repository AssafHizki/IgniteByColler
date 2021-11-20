import * as React from 'react';
import Grid from '@mui/material/Grid';
import DrawerWithChildren from './Drawer';
import StickyNote from './StickyNote';
import browserHistory from '../../routes/history';
import { UserContext } from '../../AuthContext';
import { getUsersByIDs } from '../../firebase/functions';
import { Divider, Typography } from '@mui/material';

export default function Contacts(props) {

    const user = React.useContext(UserContext);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        if (!user) {
            browserHistory.push("/");
        }

        async function _getData(contacts) {
            getUsersByIDs(contacts).then(usersData => { setUsers(usersData); })
                .catch(e => console.log(e))
        }

        if (user && user.myContacts && user.contactsAddressedMe) {
            let contacts = [...user.myContacts, ...user.contactsAddressedMe];
            _getData(contacts);
        }

    }, [user])

    let usersAddressedMe = users.filter(u => user.myContacts.includes(u.id));
    let myContacts = users.filter(u => user.contactsAddressedMe.includes(u.id));

    return (
        <DrawerWithChildren >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5">
                    Contacts addressed me
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
                <Divider orientation="vertical" sx={{ maring: 5 }} style={{ border: 1 }} />
                <Typography variant="h5">
                    My contacts
                </Typography>
                {myContacts.map((userNote, index) => {
                    if (!userNote.addressedMe) {
                        return (
                            <Grid item xs={12} md={4} lg={4} key={"usersIContacted" + index}>
                                <StickyNote userNote={userNote} />
                            </Grid>
                        )
                    }
                })}
            </div>
        </DrawerWithChildren>
    );
}
