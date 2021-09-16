import * as React from 'react';
import Grid from '@mui/material/Grid';
import DrawerWithChildren from './Drawer';
import StickyNote from './StickyNote';

const pitch = "At the age of 43 he made the decision to jump out of a plane.\n" +
    "The idea scared the shit out of him but the reward of finally feeling like a real man was worth it. So all geared up away he flew — the plane’s door open during the whole flight.\n" +
    "Trying hard not to gag in front of anyone he approached the door once they were above the clouds.\n" +
    "Don’t think you coward! Just jump! What’s the worst that could happen? Living like this is far worse than the shoot not opening, he thought.\n" +
    "So he jumped and fell towards the Earth at 120 mph.\n" +
    "He felt at peace as he fell. Frantic thoughts did not cross his mind as one might think. Just peace.\n" +
    "When he hit the ground and stood up tears filled his eyes.\n" +
    "He would never be a real man.\n" +
    "That ship sailed long ago."

const join = "He used a pencil to say goodbye. Maybe that would make it less permanent. Words are only as strong as their intent and he didn’t want to leave.\n" +
    "His parents had once hinted that they knew the truth. But by the end of the day their heads were back in The Good Book — their eyes on everything but him.\n" +
    "So with a whisper he crafted his goodbye on paper.\n" +
    "He made the sentences sharp. His points were daggers. An eraser could make them go away. But he knew his parents wouldn’t see that.\n" +
    "“That’s why I have to go in the first place,” he thought.\n" +
    "And when he took his first step into the world as an honest man he felt fixed.\n" +
    "He’d left the note next to the TV. Burnable, tearable. Eraseable.\n" +
    "Maybe after they did all that, they’d remember he was just their son."

function DashboardContent() {
    let data = [];

    for (let i = 0;i < 20;i++) {
        data.push({ elevatorPitch: pitch + i, whyJoin: join + i });
    }


    return (
        <DrawerWithChildren>
            {data.map((note, index) => {

                return (
                    <Grid item xs={12} md={4} lg={3} key={index}>
                        <StickyNote {...note} />
                    </Grid>
                )
            })}
        </DrawerWithChildren>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}