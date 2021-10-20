import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import sticky_note from '../../images/sticky_note.png';
import Dialog from '@material-ui/core/Dialog';
import { UserContext } from '../../AuthContext';

const useStyles = makeStyles({

    pos: {
        padding: 12,
    },

});

export default function SuccessDialog({ onClose, text }) {
    const classes = useStyles();
    const user = React.useContext(UserContext);

    React.useEffect(() => {
        user.updateUser({ uid: user.uid, email: user.email });
    }, [])

    return (
        <Dialog onClose={onClose} open>
            <Typography className={classes.pos} color="primary">
                {
                    text
                }

            </Typography>
        </Dialog>
    );
}
