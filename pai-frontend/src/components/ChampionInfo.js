import React from 'react'
import { Grid, Card, CardActionArea, CardMedia, Paper, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'


const styles = theme => ({
    card: {
        display: 'flex',
        //flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
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
        return (
                <Grid item container
                    spacing={3}
                    justify="center"
                    alignItems="center"
                    direction="column">
                    <Grid item xs={12}  >
                        <Card>
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
                    <Grid item container xs={12} className={classes.card}>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                KDA
                            </Typography>
                        </Paper>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                Win Rate %
                            </Typography>
                        </Paper>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                Play Rate %
                            </Typography>
                        </Paper>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                Ban Rate
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item container xs={12} className={classes.card}>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                Damage Dealt
                            </Typography>
                        </Paper>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                Damage Dealt To Objectives
                            </Typography>
                        </Paper>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                Damage Taken
                            </Typography>
                        </Paper>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                Gold Earned
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item container xs={12} className={classes.card}>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                Vision Score
                            </Typography>
                        </Paper>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                Total Heal
                            </Typography>
                        </Paper>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                Champion Level
                            </Typography>
                        </Paper>
                        <Paper item xs={3}>
                            <Typography component="h6" variant="h6">
                                First Blood Kill %
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item container xs={12} className={classes.card}>
                        <Paper item xs={4}>
                            <Typography component="h6" variant="h6">
                                First Tower %
                            </Typography>
                        </Paper>
                        <Paper item xs={4}>
                            <Typography component="h6" variant="h6">
                                Lane %
                            </Typography>
                        </Paper>
                        <Paper item xs={4}>
                            <Typography component="h6" variant="h6">
                                Duration
                            </Typography>
                        </Paper>

                    </Grid>
                </Grid>
        )
    }
}

export default withStyles(styles)(ChampionInfo);