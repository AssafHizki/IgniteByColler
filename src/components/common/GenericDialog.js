import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { Colors } from './Constants';

const useStyles = makeStyles({
    text: {
        padding: 12,
    },
});

export default function GenericDialog({ onClose, text, buttonTitle = null, onButtonPress = null, ButtonBackground = null }) {
    const classes = useStyles();

    return (
        <Dialog onClose={onClose} open>
            <Typography className={classes.text} color="primary">
                {
                    text
                }
            </Typography>
            {
                buttonTitle && onButtonPress &&
                <Button size="medium" style={{
                    color: "white", justifyContent: 'center',
                    backgroundColor: ButtonBackground || Colors.ButtonBackground
                }}
                    onClick={() => onButtonPress()}>
                    {buttonTitle}</Button>
            }
        </Dialog>
    );
}
