import React from 'react'
import { Grid, Card, CardActionArea, CardMedia, Paper, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'


const styles = theme => ({
    card: {
        display: 'flex',
        //flexDirection: 'row-reverse',
        //justifyContent: 'flex-end'
    },
    icon: {
        width: 90,
        height: 90,
    },
    content: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 6,
        paddingRight: 6,

    },
})


class ChampionInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let string = "Ahri,the Nine-Tailed Fox"
        const { classes } = this.props
        let vis = "hidden"
        return (
            <Grid item visibility={vis}>
                <Grid container>
                    <Grid item xs={12}  >
                        <Card fullWidth>
                            <CardActionArea className={classes.card} >
                                <CardMedia
                                    className={classes.icon}
                                    component="img"
                                    alt="Champion"
                                    image="http://placekitten.com/48/48"
                                    title="Champion"
                                />
                                <CardContent className={classes.content}>
                                    <Typography component="h4" variant="h4">
                                        {string}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(ChampionInfo);