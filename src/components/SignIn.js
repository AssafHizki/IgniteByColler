import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { GeneralDesign } from './utils';
import { makeStyles } from '@material-ui/core/styles';
import browserHistory from '../routes/history';
import { signIn, resetPassword } from '../firebase/functions';
import { UserContext } from '../AuthContext';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState(false);
    const user = React.useContext(UserContext);

    React.useEffect(() => {
        if (user) {
            browserHistory.push("/dashboard");
        }
    }, [user])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);
        signIn(email, password)
            .then(thisUser => {
                if (!thisUser) {
                    setError(true);
                }
            })
            .catch(e => console.log("error: ", e))
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            return setError(true)
        }

        resetPassword(email).then(ok => {
            if (ok) {
                alert(`A reset password email was sent to ${email}`)
            }
            else {
                alert(`Couldn't send a reset password email to ${email}`);
            }
        })
    }

    return (
        <GeneralDesign title="Sign In">
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
                <Grid container>
                    <Grid item xs>
                        <Link component="button" variant="body2" onClick={handleResetPassword}>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="signup" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </form >
        </GeneralDesign >
    );
}