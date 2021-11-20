import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { signIn } from '../firebase/functions';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles({
    text: {
        padding: 12,
    },
});

export default function SignInDialog({ onClose, onLoggedIn }) {
    const classes = useStyles();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);
        signIn(email, password)
            .then(thisUser => {
                if (!thisUser) {
                    setError(true);
                }
                else {
                    onLoggedIn()
                }
            })
            .catch(e => {
                if (e.message === "Email not verified") {
                    alert("Please verify your email account!")
                }
                console.log("error: ", e)
            })
    };

    return (
        <Dialog onClose={onClose} open>
            <Typography variant="h5">
                Sign in to your account
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => { setEmail(e.target.value); setError(false); }}
                    error={error}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => { setPassword(e.target.value); setError(false); }}
                    error={error}
                    helperText={error && "Email or password error"}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </form>
        </Dialog>
    );
}
