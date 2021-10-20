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


    return (
        <DrawerWithChildren >

            {users.map((userNote, index) => {
                return (
                    <Grid item xs={12} md={4} lg={3} key={index}>
                        <StickyNote userNote={userNote} />
                    </Grid>
                )
            })}
        </DrawerWithChildren>
    );
}
