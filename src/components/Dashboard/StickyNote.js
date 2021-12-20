import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import { sendMail, sendMatchFoundEmail } from '../../utils';
import { updateUser, updateRemoteUserContacts, updateMatchCollection } from '../../firebase/functions';
import { UserContext } from '../../AuthContext';
import SuccessDialog from './SuccessDialog';
import { RibbonContainer, RightCornerRibbon } from "react-ribbons";
import { Colors } from '../common/Constants';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { deepPurple } from '@material-ui/core/colors';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';

const useStyles = makeStyles((theme) => ({

    cardTeam: {
        width: theme.spacing(30),
        height: theme.spacing(70),
        borderRadius: 30,
        background: `linear-gradient(#ffffff, ${deepPurple[200]})`,
        boxShadow: 'none',
        '&:hover, &:focus': {
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'
        }
    },
    cardIgniter: {
        width: theme.spacing(30),
        height: theme.spacing(70),
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(#ffffff, ${Colors.Gold})`,
        boxShadow: 'none',
        '&:hover, &:focus': {
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'
        }
    },
    rootDialog: {
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
        margin: 10,
        justifyContent: 'space-between'
    },
    ribbonDialogContainer: {
        minWidth: 150,
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 5
    },
    content: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        width: '100%',
    },
}));

function StickyNoteDialog({ userNote, onClose, onSuccess }) {
    const classes = useStyles();
    const user = React.useContext(UserContext);
    const connectionType = user.myContacts.includes(userNote.id) ? "alreadyConnected"
        : user.contactsAddressedMe.includes(userNote.id) ? "addressedMe" : "notConnected";
    const isTeam = userNote.type === "team";

    const onClick = async (matchConnection) => {
        if (matchConnection) {
            sendMatchFoundEmail(user.email, user.fullName, userNote.email, userNote.fullName);
            updateMatchCollection(user.uid, userNote.id);
        }

        else {
            sendMail(userNote.fullName, userNote.email, user.uid);
        }

        updateUser({
            "contacts": {
                "addressedMe": user.contactsAddressedMe,
                "myContacts": [...user.myContacts, userNote.id]
            }
        })
            .then(() => {
                onSuccess();
                updateRemoteUserContacts(userNote.id);
            })
            .catch(e => console.log(e))
    }

    return (
        <Dialog onClose={onClose} open>
            <RibbonContainer className={classes.ribbonDialogContainer}>
                <CardContent className={classes.rootDialog}>
                    <RightCornerRibbon backgroundColor={isTeam ? Colors.Purple : Colors.Gold}
                        color={isTeam ? '#ffff' : "black"} fontFamily="Arial"
                    >
                        {isTeam ? "TEAM" : "IGNITER"}
                    </RightCornerRibbon>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }} gutterBottom>
                        MEET {user.fullName.split(' ')[0]}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" style={{
                        display: 'flex', alignItems: 'center', marginTop: 5,
                        padding: 10
                    }}>
                        {isTeam ? "SKILLS REQUIRED" : "SKILLS"} {userNote.powers.map((power, index) => (
                            power && power.length > 0 &&
                            <div style={{ margin: 5, fontSize: 14, fontWeight: 10 }} key={"Power" + index}>
                                <Chip label={power} style={{ color: 'white ', backgroundColor: 'gray' }} />
                            </div>
                        ))}
                    </Typography>
                    <Typography variant="body1" style={{
                        display: 'flex', alignItems: 'center', marginTop: 5,
                        padding: 10
                    }}>
                        Verticals {userNote.fields.map((field, index) => (
                            field && field.length > 0 &&
                            <div style={{ margin: 5, fontSize: 14, fontWeight: 10 }} key={"field" + index}>
                                <Chip label={field} style={{ color: 'white ', backgroundColor: 'gray' }} />
                            </div>
                        ))}
                    </Typography>
                    <div style={{ padding: 10 }}>
                        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                            About me
                        </Typography>
                        <Typography color="body2" gutterBottom>
                            {userNote.elevatorPitch}
                        </Typography>
                    </div>
                    <div style={{ padding: 10 }}>

                        <Typography variant="h5" style={{ fontWeight: 'bold' }} >
                            What's unique about you
                        </Typography>
                        <Typography color="body2" gutterBottom>
                            {userNote.whyJoin}
                        </Typography>
                    </div>
                </CardContent>

                <Button size="medium" style={{
                    backgroundColor: Colors.ButtonBackground, color: 'white', alignSelf: 'center'
                }}
                    onClick={() => onClick(connectionType === "addressedMe")} disabled={connectionType === "alreadyConnected"}>
                    {connectionType === "alreadyConnected" ? "Already Connected" :
                        connectionType === "addressedMe" ? `CONNECT WITH ${userNote.fullName.split(' ')[0]}` :
                            `CONTACT ${userNote.fullName.split(' ')[0]}`}
                </Button>
            </RibbonContainer>
        </Dialog >
    );
}

export default function StickyNote({ userNote, openDialog = false }) {
    const classes = useStyles();
    const [dialog, setDialog] = useState();
    const isTeam = userNote.type === "team";

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
        <Card className={isTeam ? classes.cardTeam : classes.cardIgniter} >
            <RibbonContainer className={classes.ribbon}>
                {dialog}
                <RightCornerRibbon backgroundColor={isTeam ? Colors.Purple : Colors.Gold}
                    color={isTeam ? '#ffff' : "black"} fontFamily="Arial"
                >
                    {isTeam ? "TEAM" : "IGNITER"}
                </RightCornerRibbon>
                <CardContent>
                    {isTeam ? <PeopleIcon /> : <PersonIcon />}
                    {
                        userNote.powers.length > 0 &&
                        <div style={{ padding: 10 }}>
                            <Typography variant="h6" style={{ fontWeight: 'bold' }} >
                                {isTeam ? "SKILLS REQUIRED" : "SKILLS"}
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                                {userNote.powers.map((power, index) => (
                                    power && power.length > 0 &&
                                    <div style={{ margin: 5, fontWeight: 9 }} key={"Power" + index}>
                                        <Chip label={power} style={{ color: 'white ', backgroundColor: 'gray', fontSize: 12 }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    {
                        userNote.fields.length > 0 &&
                        <div style={{ padding: 10 }}>
                            <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: 10 }} >
                                VERTICALS
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                                {userNote.fields.map((field, index) => (
                                    <div style={{ margin: 5, fontWeight: 8 }} key={"Field" + userNote.id + index}>
                                        <Chip label={field} style={{ color: 'white ', backgroundColor: 'gray', fontSize: 12 }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <div style={{ padding: 10 }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: 10 }} gutterBottom >
                            {isTeam ? "ABOUT US" : "ABOUT"}
                        </Typography>
                        <Typography style={{ color: 'GrayText', textAlign: 'left' }} variant="body2">
                            {userNote.elevatorPitch}
                        </Typography>
                    </div>
                </CardContent>
                <Button size="medium" style={{
                    color: "white", justifyContent: 'center', backgroundColor: Colors.ButtonBackground,
                    marginTop: 'auto'
                }}
                    onClick={() => openNoteDialog()}>
                    MORE</Button>
            </RibbonContainer>
        </Card >

    );
}