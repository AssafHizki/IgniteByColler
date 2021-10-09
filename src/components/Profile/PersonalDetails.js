import * as React from 'react';
import DrawerWithChildren from '../Dashboard/Drawer';
import browserHistory from '../../routes/history';
import { UserContext } from '../../AuthContext';
import { Button } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { updateUserAuth } from '../../firebase/functions';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    delete: {
        marginTop: theme.spacing(3),
    },
}));

export default function Powers(props) {
    const user = React.useContext(UserContext);
    const [error, setError] = React.useState(false);
    const classes = useStyles();
    const [email, setEmail] = React.useState(user?.email);
    const [password, setPassword] = React.useState();

    React.useEffect(() => {
        if (!user) {
            browserHistory.push("/");
        }
    }, [user])

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email && password) {
            updateUserAuth(email, password)
                .then((ok) => console.log("success"))
        }
    }


    return (
        <DrawerWithChildren >
            <div>
                <form className={classes.formControl} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="ignite_email"
                        label="Email Address"
                        name="ignite_email"
                        autoComplete="ignite_email"
                        autoFocus
                        onChange={e => { setEmail(e.target.value); setError(false); }}
                        error={error}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="ignite_password"
                        label="Password"
                        type="password"
                        id="ignite_password"
                        autoComplete="ignite_password"
                        onChange={e => { setPassword(e.target.value); setError(false); }}
                        helperText={error && "Password should be at least 6 characters or email is taken"}
                        error={error}
                    />
                    <Button onClick={handleSubmit} type="submit" >Update</Button>

                </form >
                <Button onClick={() => console.log("delete")} color="error" className={classes.delete}>Delete Account</Button>
            </div>
        </DrawerWithChildren>
    );
}
