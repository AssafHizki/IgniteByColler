import * as React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { GeneralDesign } from './utils';
import { logOut } from '../firebase/functions';

export default function LogOut() {


    React.useEffect(() => {
        logOut()
    }, [])

    return (
        <GeneralDesign title="Loged Out">
            <Grid container>
                <Grid item xs>
                    <Link href="signin" variant="body2">
                        Sign in
                    </Link>
                </Grid>
                <Grid item>
                    <Link target="_blank" href="https://www.collerignite.com/" variant="body2">
                        Visit out website
                    </Link>
                </Grid>
            </Grid>
        </GeneralDesign >
    );
}