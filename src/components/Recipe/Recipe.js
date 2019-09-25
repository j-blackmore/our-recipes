import React from 'react';
import { makeStyles, Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        margin: '0 auto',
    },
    media: {
        height: 140,
    }
});

export default function Recipe() {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardHeader 
                    title="Crepes"
                    subheader="Quick and easy crepe recipe."
                />
                <CardMedia
                    className={classes.media}
                    image="/images/crepes.jpg"
                    title="Crepes"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6">
                        Ingredients
                    </Typography>
                    <Typography variant="body2" component="span">
                        - 125g Flour <br/>
                        - 250ml Milk <br/>
                        - 2 Lg Eggs <br/>
                        - Tbsp Sugar <br/>
                        - Pinch of Salt
                    </Typography>
                    <Typography gutterBottom variant="h6">
                        Method
                    </Typography>
                    <Typography variant="body2" component="span">
                        1. Prepare the mixture.<br/>
                        2. Cook the crepes.<br/>
                        3. Enjoy.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
