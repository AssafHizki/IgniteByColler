import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import { sendMail } from '../../utils';
import { updateUser } from '../../firebase/functions';
import { UserContext } from '../../AuthContext';
import SuccessDialog from './SuccessDialog';
import { RibbonContainer, RightCornerRibbon } from "react-ribbons";
import { Colors } from '../common/Constants';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        backgroundColor: 'white',
        boxShadow: 'none'
    },
    rootDialog: {
        minWidth: '30vw',
        backgroundColor: 'white',
        boxShadow: 'none'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
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
    ribbon: {
        minWidth: 200,
        minHeight: 300,
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
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
        sendMail(userNote.fullName, userNote.email, userNote.id);
        updateUser({ "contacts": [...user.contacts, userNote.id] })
            .then(() => onSuccess())
            .catch(e => console.log(e))
    }

    return (
        <Dialog onClose={onClose} open>
            <RibbonContainer className={classes.ribbon}>
                <CardContent className={classes.rootDialog}>
                    <RightCornerRibbon backgroundColor={userNote.type === "team" ? Colors.Purple : Colors.Gold}
                        color={userNote.type === "team" ? '#ffff' : "black"} fontFamily="Arial"
                    >
                        {userNote.type === "team" ? "TEAM" : "IGNITER"}
                    </RightCornerRibbon>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }} gutterBottom>
                        MEET {user.fullName.split(' ')[0]}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
                        Skills {userNote.powers.map((power, index) => (
                            power && power.length > 0 &&
                            <div style={{ margin: 5, fontSize: 14, fontWeight: 10 }} key={"Power" + index}>
                                <Chip label={power} style={{ color: 'white ', backgroundColor: 'gray' }} />
                            </div>
                        ))}
                    </Typography>
                    <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
                        Verticals {userNote.fields.map((field, index) => (
                            field && field.length > 0 &&
                            <div style={{ margin: 5, fontSize: 14, fontWeight: 10 }} key={"field" + index}>
                                <Chip label={field} style={{ color: 'white ', backgroundColor: 'gray' }} />
                            </div>
                        ))}
                    </Typography>
                    <Typography variant="h5" style={{ fontWeight: 'bold', marginTop: 20 }}>
                        About me
                    </Typography>
                    <Typography color="body2" gutterBottom>
                        {userNote.elevatorPitch}
                    </Typography>
                    <Typography variant="h5" style={{ fontWeight: 'bold', marginTop: 20 }} >
                        What's unique about you
                    </Typography>
                    <Typography color="body2" gutterBottom>
                        {userNote.whyJoin}
                    </Typography>
                </CardContent>

                <Button size="medium" style={{ backgroundColor: Colors.ButtonBackground, color: 'white' }}
                    onClick={onClick} disabled={disabledConnection}>
                    {disabledConnection ? "Already Connected" : `CONTACT ${userNote.fullName.split(' ')[0]}`}</Button>
            </RibbonContainer>
        </Dialog>
    );
}

export default function SimpleCard({ userNote, openDialog = false }) {
    const classes = useStyles();
    const [dialog, setDialog] = useState();

    const openNoteDialog = () => {
        setDialog(
            <StickyNoteDialog userNote={userNote}
                onClose={() => setDialog()}
                onSuccess={() => setDialog(<SuccessDialog onClose={() => setDialog()}
                    text="AWESOME! We just sent an email to this contact. We'll get back to you as soon as something happens. Meanwhile, check 'Contacts' for you new contact" />)}
            />)
    }

    useEffect(() => {
        if (openDialog) {
            openNoteDialog();
        }
    }, [])

    return (
        <Card className={classes.root} >
            <RibbonContainer className={classes.ribbon}>
                {dialog}
                <RightCornerRibbon backgroundColor={userNote.type === "team" ? Colors.Purple : Colors.Gold}
                    color={userNote.type === "team" ? '#ffff' : "black"} fontFamily="Arial"
                >
                    {userNote.type === "team" ? "TEAM" : "IGNITER"}
                </RightCornerRibbon>
                <CardContent >
                    {
                        userNote.powers.length > 0 &&
                        <div>
                            <Typography variant="h6" style={{ fontWeight: 'bold' }} >
                                SKILLS
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                                {userNote.powers.map((power, index) => (
                                    power && power.length > 0 &&
                                    <div style={{ margin: 5, fontSize: 14, fontWeight: 10 }} key={"Power" + index}>
                                        <Chip label={power} style={{ color: 'white ', backgroundColor: 'gray' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    {
                        userNote.fields.length > 0 &&
                        <div>
                            <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: 10 }} >
                                VERTICALS
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                                {userNote.fields.map((field, index) => (
                                    <div style={{ margin: 5 }} key={"Field" + index}>
                                        <Chip label={field} style={{ color: 'white ', backgroundColor: 'gray' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: 10 }} gutterBottom >
                        ABOUT
                    </Typography>
                    <Typography style={{ color: 'GrayText', textAlign: 'left' }} variant="body2">
                        {userNote.elevatorPitch}
                    </Typography>
                </CardContent>
                <Button size="medium" style={{ color: "white", justifyContent: 'center', backgroundColor: Colors.ButtonBackground }}
                    onClick={() => openNoteDialog()}>
                    MORE</Button>
            </RibbonContainer>
        </Card >

    );
}