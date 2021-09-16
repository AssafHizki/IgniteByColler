import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import logo from '../../images/logo.png';
import TextField from '@material-ui/core/TextField';
import { createTheme } from '@mui/material/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import browserHistory from '../../routes/history';
import { createUser } from '../../firebase/functions';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(1),
        display: 'flex',
        flexDiraction: 'row',
        alignItems: 'center'
    },
    closeButton: {
        color: theme.palette.grey[500],
        marginLeft: theme.spacing(2),
    },
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(12),
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Avatar src={logo} className={classes.avatar} variant="square" />
            <Typography variant="h6" >{children}</Typography>
        </MuiDialogTitle >
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between"
    },
}))(MuiDialogActions);

export default function SignUpDialog({ onClose, data }) {
    const theme = createTheme();
    const classes = styles(theme);
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const handleSubmit = () => {
        createUser({ ...data, email, password })
            .then(user => {
                if (user) {
                    browserHistory.push("/signin");
                }
            })
            .catch(e => console.log("E: ", e))
    }

    return (
        <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open>
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                Last thing
            </DialogTitle>
            <DialogContent dividers>
                <form className={classes.form}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="ignite_email"
                        label="Email Address"
                        name="ignite_email"
                        autoComplete="ignite_email"
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
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
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="I have read and agreed to the terms and conditions"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                {
                    (<Button color="primary" onClick={() => handleSubmit()}>
                        Sign Up
                    </Button>)
                }
                {
                    (<Button onClick={onClose} color="secondary" >
                        Go Back
                    </Button>)
                }
            </DialogActions>
        </Dialog>
    );
}