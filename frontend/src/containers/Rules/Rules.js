import React from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

const Rules = () => {
    const classes = useStyles();

    return (
        <Container style={{'border': '2px solid grey', 'borderRadius': '3px', 'background': '#FAFAFA'}} component='div'>
            <div className={classes.paper}>
                <Typography component="h1" variant="h3">
                    Правила
                </Typography>
            </div>
        </Container>
    )
};

export default Rules;