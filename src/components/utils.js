import * as React from 'react';
import GeneralDesign from './GeneralDesign';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" {...props} >
            {`Copyright © `}
            <p>
                < Link target="_blank" color="inherit" href="https://www.collerignite.com/" rel="noopener">
                    Ignite {new Date().getFullYear()}
                </Link >
            </p>
            {
                !props.ShortCopyRight &&
                (
                    <p>
                        {' | '}
                        <Link target="_blank" color="inherit" href="mailto:coller.ignite@gmail.com" rel="noopener">
                            Contact us
                        </Link>
                        {' | '}
                        <Link target="_blank" color="inherit" href="https://chat.whatsapp.com/EW4diqDZtxtFS9UcYunAXF" rel="noopener">
                            WhatsApp
                        </Link>

                    </p>
                )
            }
        </Typography >
    );
}

export { Copyright, GeneralDesign }