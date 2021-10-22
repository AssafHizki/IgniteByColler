import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import sticky_note from '../../images/sticky_note.png';
import Dialog from '@material-ui/core/Dialog';
import { sendMail } from '../../utils';
import { updateUser } from '../../firebase/functions';
import { UserContext } from '../../AuthContext';
import SuccessDialog from './SuccessDialog';
import { RibbonContainer, LeftCornerRibbon } from "react-ribbons";

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

function StickyNoteDialog({ userNote, onClose, onSuccess }) {
    const classes = useStyles();
    const user = React.useContext(UserContext);
    const disabledConnection = user.contacts.find(con => con === userNote.id);

    const onClick = async () => {
        sendMail(userNote.fullName, userNote.email);
        updateUser({ "contacts": [...user.contacts, userNote.id] })
            .then(() => onSuccess())
            .catch(e => console.log(e))
    }

    return (
        <Dialog onClose={onClose} open>
            <CardContent className={classes.root}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Elevator Pitch
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {userNote.elevatorPitch}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Why you?
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {userNote.whyJoin}
                </Typography>
                <CardActions>
                    <Button size="large" color="primary" onClick={onClick} disabled={disabledConnection}>
                        {disabledConnection ? "Already Connected" : "Contact"}</Button>
                </CardActions>
            </CardContent>
        </Dialog>
    );
}

export default function SimpleCard({ userNote }) {
    const classes = useStyles();
    const [dialog, setDialog] = useState();

    return (
        <Card className={classes.root}>
            {dialog}
            <RibbonContainer className="custom-class">
                <LeftCornerRibbon backgroundColor="#0088ff" color="#f0f0f0" fontFamily="Arial">
                    {userNote.type === "team" ? "Team" : "Igniter"}
                </LeftCornerRibbon>
                <CardContent >
                    <Typography variant="h6" component="h5" >
                        Powers
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                        {userNote.powers.map(power => (
                            <div style={{ margin: 5 }}>
                                {power}
                            </div>
                        ))}
                    </div>
                    <Typography variant="h6" component="h5" >
                        Fields
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                        {userNote.fields.map(field => (
                            <div style={{ margin: 5 }}>
                                {field}
                            </div>
                        ))}
                    </div>
                    <Typography variant="h5" component="h2" gutterBottom >
                        Elevator Pitch
                    </Typography>
                    <Typography className={classes.pos} variant="body2">
                        {userNote.elevatorPitch}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium" color="primary" onClick={() => setDialog(
                        <StickyNoteDialog userNote={userNote}
                            onClose={() => setDialog()}
                            onSuccess={() => setDialog(<SuccessDialog onClose={() => setDialog()}
                                text="Success! An email was sent and you can find this new contact on your 'contacts'" />)}
                        />)}>
                        Learn More</Button>
                </CardActions>
            </RibbonContainer>
        </Card>

    );
}