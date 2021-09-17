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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/user/andrewtneel)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        height: `68px !important`,
        width: `130px !important`,
    },
    paper: {
        margin: theme.spacing(8, 4),
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
            <Grid item sm={8} md={5} >
                <div className={classes.paper}>
                    {
                        props.goBack && (
                            <ArrowBackIcon onClick={() => props.goBack()} />
                        )
                    }

                    <Avatar variant="square" src={logo} classes={{ root: classes.avatar }} alt="Logo" />
                    <Typography variant="h5" style={{ marginBottom: 5 }}>
                        {props.title ? props.title : "Ignite By Coller"}
                    </Typography>
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