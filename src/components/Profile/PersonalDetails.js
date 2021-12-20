import * as React from 'react';
import DrawerWithChildren from '../Dashboard/Drawer';
import browserHistory from '../../routes/history';
import { UserContext } from '../../AuthContext';
import { Button, Typography } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { updateUserAuth, deleteCurrUser } from '../../firebase/functions';
import SuccessDialog from '../Dashboard/SuccessDialog';
import { Box } from '@mui/system';
import GenericDialog from '../common/GenericDialog';
import SignInDialog from '../SignInDialog';
import { Colors } from '../common/Constants';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
        marginLeft: theme.spacing(9)

    },
    delete: {
        marginTop: theme.spacing(20),
        marginLeft: theme.spacing(9)

    },
}));

export default function Powers(props) {
    const user = React.useContext(UserContext);
    const [error, setError] = React.useState(false);
    const classes = useStyles();
    const [email, setEmail] = React.useState(user?.email);
    const [password, setPassword] = React.useState();
    const [dialog, setDialog] = React.useState();

    React.useEffect(() => {
        if (!user) {
            browserHistory.push("/");
        }
    }, [user])

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email && password) {
            updateUserAuth(email, password)
                .then(() => setDialog(<SuccessDialog onClose={() => setDialog()} text="Success" />))
        }
    }


    return (
        <DrawerWithChildren >
            <div>
                {dialog}
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
                    <Button onClick={handleSubmit} type="submit" style={{ marginTop: 20 }}>Update</Button>
                </form >
                <Box sx={{ border: 3, borderColor: 'red', marginLeft: 5 }}>
                    <Typography variant="h6" style={{ textDecoration: 'underline' }}>
                        DANGER ZONE!
                    </Typography>
                    <Button onClick={() => setDialog(
                        <GenericDialog text="Are you sure you want to delete your account?" onClose={() => setDialog()}
                            buttonTitle="permanently delete" onButtonPress={() => setDialog(
                                <SignInDialog onClose={() => setDialog()} onLoggedIn={() => deleteCurrUser()} />
                            )}
                            ButtonBackground={Colors.RedButtonBackground}
                        />
                    )} color="error" className={classes.delete}>Delete Account</Button>
                </Box>
            </div>
        </DrawerWithChildren >
    );
}
