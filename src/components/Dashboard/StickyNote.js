import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import sticky_note from '../../images/sticky_note.png';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        backgroundImage: `url(${sticky_note})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        boxShadow: 'none'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        position: 'absolute',
        minWidth: 200,
        minHeight: 360,
        zIndex: 3,
    },
    content: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        width: '100%',
    },
});

function StickyNoteDialog({ elevatorPitch, whyJoin, onClose }) {
    const classes = useStyles();

    return (
        <Dialog onClose={onClose} open>
            <CardContent className={classes.root}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Elevator Pitch
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {elevatorPitch}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Why you?
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {whyJoin}
                </Typography>
                <CardActions>
                    <Button size="large" color="primary" onClick={() => console.log("Connect!")}>
                        Contact</Button>
                </CardActions>
            </CardContent>
        </Dialog>
    );
}

export default function SimpleCard({ elevatorPitch, whyJoin }) {
    const classes = useStyles();
    const [dialog, setDialog] = useState();

    return (
        <Card className={classes.root}>
            {dialog}
            <CardContent >
                <Typography variant="h5" component="h2" gutterBottom>
                    Elevator Pitch
                </Typography>
                <Typography className={classes.pos} variant="body2">
                    {elevatorPitch}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" color="primary" onClick={() => setDialog(
                    <StickyNoteDialog elevatorPitch={elevatorPitch} whyJoin={whyJoin}
                        onClose={() => setDialog()} />)}>
                    Learn More</Button>
            </CardActions>
        </Card>
    );
}