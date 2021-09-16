import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { useLocation } from "react-router-dom";
import { GeneralDesign } from '../utils';
import { makeStyles } from '@material-ui/core/styles';
import SignUpDialog from './SignUpDialog';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(3),
        alignSelf: 'flex-start'
    },
}));


export default function SignUpDetails(props) {
    const location = useLocation();
    const type = location?.state?.type;

    const classes = useStyles();
    const [superPowers, setSuperPowers] = React.useState({
        managment: false,
        tech: false,
        product: false,
        cusomers: false,
        other: ''
    })
    const [fields, setFields] = React.useState({
        foodtech: false,
        fintech: false,
        cyber: false,
        industry: false,
        other: ''
    })
    const [whyJoin, setWhyJoin] = React.useState('');
    const [elevatorPitch, setElevatorPitch] = React.useState('');
    const [dialog, setDialog] = React.useState();

    const changeSuperPower = (event) => {
        setSuperPowers({ ...superPowers, [event.target.name]: event.target.checked });
    };

    const changeField = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.checked });
    };

    let superPowerError = Object.entries(superPowers).filter((v) => { return v[1] }).length > 2;
    let fieldsError = Object.entries(fields).filter((v) => { return v[1] }).length > 3;

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            whyJoin,
            elevatorPitch,
            superPowers: Object.entries(superPowers).filter((v) => { return v[1] }),
            fields: Object.entries(fields).filter((v) => { return v[1] }),
        }
        setDialog(<SignUpDialog onClose={() => setDialog()} data={data} />)
    };

    return (
        <GeneralDesign title="Sign Up">
            {
                dialog
            }
            <FormControl required error={superPowerError} component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{type === "single" ? "My super powers are" : "Looking for someone with a super power in"}</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={superPowers.managment} onChange={changeSuperPower} name="managment" />}
                        label="Managment (fundraising, strategy, BI, etc)"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={superPowers.tech} onChange={changeSuperPower} name="tech" />}
                        label="Tech (development, POC / MVP, etc)"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={superPowers.product} onChange={changeSuperPower} name="product" />}
                        label="Product (PM, fundraising, etc"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={superPowers.cusomers} onChange={changeSuperPower} name="cusomers" />}
                        label="Cstomers (marketing, sales, distribution channels, etc"
                    />
                    <FormControlLabel
                        control={
                            <div style={{ display: 'flex', flexDirection: 'row' }} >
                                <Checkbox checked={superPowers.other} onChange={changeSuperPower} name="other" />
                                <TextField id="other_super_power" label="other" onChange={e => {
                                    if (!e.target.value) { setSuperPowers({ ...superPowers, other: false }) }
                                    else { setSuperPowers({ ...superPowers, other: e.target.value }) }
                                }} />
                            </div>
                        }
                    />
                </FormGroup>
                <FormHelperText>You can choose up to two options</FormHelperText>
            </FormControl>
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
                                <Checkbox checked={fields.other} onChange={changeField} name="other" />
                                <TextField id="other_super_power" label="other" onChange={e => {
                                    if (!e.target.value) { setFields({ ...fields, other: false }) }
                                    else { setFields({ ...fields, other: e.target.value }) }
                                }} />
                            </div>
                        }
                    />
                </FormGroup>
                <FormHelperText>You can choose up to three options</FormHelperText>
            </FormControl>
            <form onSubmit={handleSubmit} className={classes.form}>
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
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>

            </form >
        </GeneralDesign >
    );
}

