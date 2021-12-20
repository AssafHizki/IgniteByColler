import * as React from 'react';
import Link from '@mui/material/Link';
import { GeneralDesign } from '../utils';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import browserHistory from '../../routes/history';

const defaultProps = {
    bgcolor: 'background.paper',
    ml: 3,
    mr: 3,
    borderColor: 'text.primary',
    border: 1,
    padding: 2,
    display: "flex",
    flex: 1,
    justifyContent: 'center'
};

export default function SignUp() {
    return (
        <GeneralDesign title="I Want to">
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                <Box  {...defaultProps} >
                    <Button onClick={() => browserHistory.push({ pathname: "/signup/details", state: { type: 'single' } })}>
                        Join a startup
                    </Button>
                </Box>
                <Box  {...defaultProps} >
                    <Button onClick={() => browserHistory.push({ pathname: "/signup/details", state: { type: 'team' } })}>
                        Invite Co-Founders to my Venture
                    </Button>
                </Box>
            </div>


            <Link href="signin" variant="body2" sx={{ marginTop: 5 }} rel="noopener">
                Have an account? Sign In
            </Link>

        </GeneralDesign >
    );
}

