import React from "react"
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import {getChampTitle, getIconString, zeroPad} from './Helpers'

const styles = theme => ({
    cardWin: {
        display: 'flex',
        flexWrap: 'wrap',
        background: '#57a773'
    },
    cardDefeat:{
        display: 'flex',
        flexWrap: 'wrap',
        background: '#ee6352'
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

        let champTitle = getChampTitle(this.props.game.champion_name)
        let champIcon = getIconString(this.props.game.champion_name)
        const { classes } = this.props
        let game=this.props.game
        let card=game.win?classes.cardWin: classes.cardDefeat
        return(
            <Grid item >
                    <Card>
                        <CardActionArea className={card} >
                            <CardMedia
                                className={classes.icon}
                                component="img"
                                alt={champTitle}
                                image={champIcon}
                                title={champTitle}
                            />
                            <CardContent className={classes.content} >
                                <Typography>
                                    {game.map} {game.win ?  "Win" :"Defeat"}
                                </Typography>
                                <Typography>
                                    KDA {game.kills}/{game.deaths}/{game.assists}                        
                                </Typography>
                                <Typography variant="caption">
                                    cs {game.cs} {"|"} {(game.game_duration/60).toFixed()}:{zeroPad(game.game_duration%60,2)} min                    
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
        )
    }
}


export default withStyles(styles)(GameHistoryItem)