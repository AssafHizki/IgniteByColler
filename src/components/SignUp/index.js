import * as React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { GeneralDesign } from '../utils';
import Box from '@mui/material/Box';
import browserHistory from '../../routes/history';

const defaultProps = {
    bgcolor: 'background.paper',
    m: 2,
    borderColor: 'text.primary',
    border: 1,
    padding: 2,
};

export default function SignUp() {
    return (
        <GeneralDesign title="I Want to">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Box  {...defaultProps} component="button" onClick={() => browserHistory.push({ pathname: "/signup/details", state: { type: 'single' } })}>
                    Join a team with an idea
                </Box>
                <Box  {...defaultProps} component="button" onClick={() => browserHistory.push({ pathname: "/signup/details", state: { type: 'team' } })}>
                    Join partners to my team
                </Box>
            </div>
            <Grid container>
                <Grid item xs>
                    <Link component='button' onClick={() => console.log("AA")} variant="body2">
                        Contact us
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="signin" variant="body2">
                        Have an account? Sign In
                    </Link>
                </Grid>
            </Grid>
        </GeneralDesign >
    );
}

