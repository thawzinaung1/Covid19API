import React from "react";
import All from './all'
import AppNavBar from './appbar'
import {Container , Grid} from '@material-ui/core'

export default function App() {
  return (
    <Container>
            <Grid>
                <AppNavBar />
            </Grid>
            <Grid>
                <All />
            </Grid>
        </Container>
  );
}