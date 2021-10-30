import * as React from 'react';
import DrawerWithChildren from '../Dashboard/Drawer';
import browserHistory from '../../routes/history';
import { UserContext } from '../../AuthContext';
import { Button } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { updateUser } from '../../firebase/functions';
import SuccessDialog from '../Dashboard/SuccessDialog';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function Powers(props) {
    const user = React.useContext(UserContext);
    const location = useLocation();
    const classes = useStyles();
    const type = location?.state?.type;
    const [elevatorPitch, setElevatorPitch] = React.useState(user?.elevatorPitch);
    const [whyJoin, setWhyJoin] = React.useState(user?.whyJoin);
    const [dialog, setDialog] = React.useState();

    React.useEffect(() => {
        if (!user) {
            browserHistory.push("/");
        }
    }, [user])

    let elevatorError = elevatorPitch.length > 150;
    let whyJoinError = whyJoin.length > 150;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (elevatorPitch && elevatorPitch.length <= 150 && whyJoin && whyJoin.length <= 150) {
            updateUser({ elevatorPitch, whyJoin })
                .then(() => setDialog(<SuccessDialog onClose={() => setDialog()} text="Success" />))

        }
    }


    return (
        <DrawerWithChildren >
            {dialog}
            <form className={classes.formControl}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="elevator_pitch"
                    label={type === "single" ? "Describe yourself" : "Describe your project (elevator pitch)"}
                    autoComplete="elevator_pitch"
                    onChange={e => setElevatorPitch(e.target.value)}
                    value={elevatorPitch}
                    error={elevatorError}
                    helperText={elevatorError && "You can write up to 150 characters"}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault() } }}
                    multiline
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="why_should_join"
                    label={type === "single" ? "Why should the team pick you?" : "Why should people join your team?"}
                    autoComplete="why_should_join"
                    onChange={e => setWhyJoin(e.target.value)}
                    value={whyJoin}
                    error={whyJoinError}
                    helperText={whyJoinError && "You can write up to 150 characters"}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault() } }}
                    multiline
                />
                <Button onClick={handleSubmit} type="submit" style={{ marginTop: 10, alignSelf: "start" }}>Update</Button>
            </form >

        </DrawerWithChildren>
    );
}
