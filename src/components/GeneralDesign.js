import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { Copyright } from './utils';
import logo from '../images/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import browserHistory from '../routes/history'
import { Link } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(/images/${Math.floor(Math.random() * (7)) + 1}.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    avatar: {
        marginBottom: theme.spacing(3),
        height: `68px !important`,
        width: `130px !important`,
    },
    paper: {
        margin: theme.spacing(5, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default function GeneralDesign(props) {
    const theme = createTheme();

    const classes = useStyles(theme);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={false} md={7} className={classes.image} />
            <Grid item md={5} >
                <div className={classes.paper}>
                    <Avatar variant="square" src={logo} classes={{ root: classes.avatar }} alt="Logo"
                        onClick={() => browserHistory.push("/")} />
                    {
                        props.goBack && (

                            <Link variant="body2" style={{ marginBottom: 15, textDecoration: 'underline' }} href="/">
                                back to home page ->
                            </Link>
                        )
                    }
                    {
                        props.entryPage ?
                            <div>
                                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                                    Meet your new team member!
                                </Typography>
                                <Typography variant="h5" style={{ marginBottom: 5 }}>
                                    Find a co-founder (or join a startup) in a super-easy way.
                                    Go ahead, try it!
                                </Typography>
                            </div>
                            :
                            <Typography variant="h3" style={{ marginBottom: 5 }}>
                                {props.title ? props.title : "Ignite By Coller"}
                            </Typography>
                    }
                    {
                        props.children
                    }
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid >
    );
}