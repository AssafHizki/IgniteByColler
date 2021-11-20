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

        console.log(user.myContacts)
        console.log(user.contactsAddressedMe)

        async function _getData(contacts) {
            getUsersByIDs(contacts).then(usersData => { setUsers(usersData); })
                .catch(e => console.log(e))
        }

        if (user && user.myContacts && user.contactsAddressedMe) {
            let contacts = [...user.myContacts, ...user.contactsAddressedMe];
            _getData(contacts);
        }

    }, [user])

    let usersAddressedMe = users.filter(u => user.contactsAddressedMe.includes(u.id));
    let myContacts = users.filter(u => user.myContacts.includes(u.id));

    return (
        <DrawerWithChildren >
            <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
                <Typography variant="h5" marginBottom={2}>
                    Contacts addressed me
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {usersAddressedMe.map((userNote, index) => {
                        return (
                            <Grid item xs={12} m={3} lg={3} key={"AddressedMe " + index}>
                                <StickyNote userNote={userNote} />
                            </Grid>
                        )
                    })}
                </div>
                <Divider sx={{ m: 2, mb: 5, mt: 5, borderBottom: 1, width: '76vw' }} />
                <Typography variant="h5" marginBottom={2}>
                    My contacts
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {myContacts.map((userNote, index) => {
                        return (
                            <Grid item xs={12} m={3} lg={3} key={"MyContacts " + index}>
                                <StickyNote userNote={userNote} />
                            </Grid>
                        )
                    })}
                </div>
            </div>
        </DrawerWithChildren >
    );
}
