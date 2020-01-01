import React from "react"
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import {getChampTitle, getIconString} from './Helpers'

const styles = theme => ({
    card: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    icon: {
        width: 90,
        height: 90,
    },
    content: {
        width: 200,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 6,
        paddingRight: 6,

    },
})

class GameHistoryItem extends React.Component{

    render(){

        let champTitle = getChampTitle(this.props.mastery.champion_name)
        let champIcon = getIconString(this.props.mastery.champion_name)
        const { classes } = this.props
        let mastery=this.props.mastery

        return(
            <Grid item >
                    <Card>
                        <CardActionArea className={classes.card} >
                            <CardMedia
                                className={classes.icon}
                                component="img"
                                alt={champTitle}
                                image={champIcon}
                                title={champTitle}
                            />
                            <CardContent className={classes.content} >
                                <Typography>
                                    LVL {mastery.champion_level}
                                </Typography>
                                <Typography>
                                    {mastery.champion_points}                 
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
        )
    }
}


export default withStyles(styles)(GameHistoryItem)