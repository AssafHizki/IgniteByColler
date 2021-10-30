import * as React from 'react';
import GeneralDesign from './GeneralDesign';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.collerignite.com/">
                Ignite
            </Link>{' '}
            {new Date().getFullYear()}
            {' | '}
            <Link color="inherit" href="mailto:coller.ignite@gmail.com">
                Contact us
            </Link>
            {' | '}
            <Link target="_blank" color="inherit" href="https://chat.whatsapp.com/EW4diqDZtxtFS9UcYunAXF">
                WhatsApp
            </Link>
        </Typography>
    );
}

export { Copyright, GeneralDesign }