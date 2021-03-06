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
    const [fullName, setFullName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState(false);
    const [privacyAgreement, setPrivacyAgreement] = React.useState(false);
    const [privacyAgreementError, setPrivacyAgreementError] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fullName || !email || !password) {
            return setError(true);
        }

        if (!privacyAgreement) {
            return setPrivacyAgreementError(true);
        }

        data.fullName = fullName;

        createUser({ ...data, email, password })
            .then(user => {
                if (user) {
                    browserHistory.push("/signin");
                }
                else {
                    setError(true);
                }
            })
            .catch(e => { console.log("E: ", e); setError(true); alert(e) })
    }

    return (
        <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open>
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                Last thing
            </DialogTitle>
            <DialogContent dividers>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoComplete="fullName"
                        autoFocus
                        onChange={e => { setFullName(e.target.value); setError(false); }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="ignite_email"
                        label="Email Address"
                        name="ignite_email"
                        autoComplete="ignite_email"
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
                    <FormControlLabel
                        control={<Checkbox checked={privacyAgreement} color="primary" onClick={() => { setPrivacyAgreement(!privacyAgreement); setPrivacyAgreementError(privacyAgreement) }} />}
                        label={<div style={{ display: 'flex', alignItems: 'center' }}><p>{"I have read and agreed to the\b"} </p><a target="_blank" href="https://docs.google.com/document/d/1_z2F8a4_oE_XSC7Oyf2KYZq0MWejJQzUVe2PIY-Udrg/edit?usp=sharing">terms and conditions</a></div>}
                    />
                    {
                        privacyAgreementError &&
                        <p style={{ color: 'red' }}>You must read and agree to the terms and conditions</p>
                    }
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Go Back
                        </Button>
                    </div>
                </form>
            </DialogContent>

        </Dialog>
    );
}