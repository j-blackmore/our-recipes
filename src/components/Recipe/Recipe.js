import React from 'react';
import { makeStyles, Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
    },
    media: {
        height: 140,
    },
    content: {
        height: 140,
        overflow: 'scroll'
    }
});

export default function Recipe(props) {
    const classes = useStyles();

    const recipe = props.recipe;
    const Ingredients = recipe.ingredients.map((item,i) => {
        return <Typography variant="body2" key={i} style={{ display:'flex' }} component="span">{item}</Typography>
    });

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardHeader 
                    title={recipe.title}
                    subheader={recipe.subtitle}
                />
                <CardMedia
                    className={classes.media}
                    image={recipe.imageUrl}
                    title=""
                />
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h6">
                        Ingredients
                    </Typography>
                    {Ingredients}
                    <Typography gutterBottom variant="h6">
                        Method
                    </Typography>
                    <Typography variant="body2" component="span">
                        {recipe.method}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
