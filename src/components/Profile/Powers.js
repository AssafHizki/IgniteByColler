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

export default function Powers(props) {
    const user = React.useContext(UserContext);
    const location = useLocation();
    const classes = useStyles();
    const [dialog, setDialog] = React.useState();
    const type = location?.state?.type;

    const [superPowers, setSuperPowers] = React.useState({
        managment: user?.powers?.includes("managment"),
        tech: user?.powers?.includes("tech"),
        product: user?.powers?.includes("product"),
        customers: user?.powers?.includes("customers"),
        other: user?.powers?.find(p =>
        (p !== "managment" && p !== "tech"
            && p !== "product" && p !== "customers")
        )
    })

    React.useEffect(() => {
        if (!user) {
            browserHistory.push("/");
        }
    }, [user])

    const changeSuperPower = (event) => {
        setSuperPowers({ ...superPowers, [event.target.name]: event.target.checked });
    };

    let superPowerError = Object.entries(superPowers).filter((v) => { return v[1] }).length > 2;

    const handleSubmit = (event) => {
        event.preventDefault();
        let thisSuperPowers = Object.entries(superPowers).filter((v) => { return v[1] });

        if (thisSuperPowers.length > 0 && thisSuperPowers.length < 3) {
            let returnValue = [];
            thisSuperPowers.forEach(s => returnValue.push(s[0] !== "other" ? s[0] : s[1]))

            updateUser({ "powers": returnValue })
                .then(() => setDialog(<SuccessDialog onClose={() => setDialog()} text="Success" />))

        }
    };


    return (
        <DrawerWithChildren >
            {dialog}
            <FormControl required error={superPowerError} component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{type === "single" ? "My super powers are" : "Looking for someone with a super power in"}</FormLabel>
                <FormGroup >
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
                        label="Product (PM, fundraising, etc)"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={superPowers.customers} onChange={changeSuperPower} name="cusomers" />}
                        label="Customers (marketing, sales, distribution channels, etc)"
                    />
                    <FormControlLabel
                        control={
                            <div style={{ display: 'flex', flexDirection: 'row' }} >
                                <Checkbox checked={superPowers.other} disabled />
                                <TextField id="other_super_power" placeholder="other" value={superPowers.other ? superPowers.other : ''}
                                    onChange={e => {
                                        if (!e.target.value) { setSuperPowers({ ...superPowers, other: false }) }
                                        else { setSuperPowers({ ...superPowers, other: e.target.value }) }
                                    }} />
                            </div>
                        }
                    />
                </FormGroup>
                <FormHelperText>You can choose up to two options</FormHelperText>
                <Button onClick={handleSubmit} type="submit" >Update</Button>
            </FormControl>
        </DrawerWithChildren>
    );
}
