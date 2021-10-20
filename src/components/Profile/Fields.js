import * as React from 'react';
import DrawerWithChildren from '../Dashboard/Drawer';
import browserHistory from '../../routes/history';
import { UserContext } from '../../AuthContext';
import { Button } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { updateUser } from '../../firebase/functions';
import SuccessDialog from '../Dashboard/SuccessDialog';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function Fields(props) {
    const user = React.useContext(UserContext);
    const location = useLocation();
    const classes = useStyles();
    const [dialog, setDialog] = React.useState();

    const type = location?.state?.type;

    const [fields, setFields] = React.useState({
        foodtech: user?.powers?.includes("foodtech"),
        fintech: user?.powers?.includes("fintech"),
        cyber: user?.powers?.includes("cyber"),
        industry: user?.powers?.includes("industry"),
        other: user?.powers?.find(p =>
        (p !== "foodtech" && p !== "fintech"
            && p !== "cyber" && p !== "industry")
        )
    })

    React.useEffect(() => {
        if (!user) {
            browserHistory.push("/");
        }
    }, [user])

    const changeField = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.checked });
    };

    let fieldsError = Object.entries(fields).filter((v) => { return v[1] }).length > 3;

    const handleSubmit = (event) => {
        event.preventDefault();
        let thisFields = Object.entries(fields).filter((v) => { return v[1] });

        if (thisFields.length > 0 && thisFields.length < 4) {
            let returnValue = [];
            thisFields.forEach(s => returnValue.push(s[0] !== "other" ? s[0] : s[1]))
            updateUser({ "fields": returnValue })
                .then(() => setDialog(<SuccessDialog onClose={() => setDialog()} text="Success" />))
        }
    };


    return (
        <DrawerWithChildren >
            {dialog}
            <FormControl required error={fieldsError} component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{type === "single" ? "I want to join in the field of" : "Our fields are"}</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={fields.foodtech} onChange={changeField} name="foodtech" />}
                        label="Foodtech / Agritech"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={fields.fintech} onChange={changeField} name="fintech" />}
                        label="Fintech"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={fields.cyber} onChange={changeField} name="cyber" />}
                        label="Cyber"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={fields.industry} onChange={changeField} name="industry" />}
                        label="Industry 4.1"
                    />
                    <FormControlLabel
                        control={
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Checkbox checked={fields.other} disabled />
                                <TextField id="other_super_power" label="other" onChange={e => {
                                    if (!e.target.value) { setFields({ ...fields, other: false }) }
                                    else { setFields({ ...fields, other: e.target.value }) }
                                }} />
                            </div>
                        }
                    />
                </FormGroup>
                <FormHelperText>You can choose up to three options</FormHelperText>
                <Button onClick={handleSubmit} type="submit" >Update</Button>
            </FormControl>
        </DrawerWithChildren>
    );
}
