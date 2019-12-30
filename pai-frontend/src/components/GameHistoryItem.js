import React from "react"
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
    card: {
        display: 'flex',
        //flexDirection: 'row-reverse',
        //justifyContent: 'space-evenly',
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

const dataDragonIcon = "http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/"


class GameHistoryItem extends React.Component{

    getChampTitle() {
        let champTitle = this.props.game.champion_name.replace(/^\w/, c => c.toUpperCase())
        champTitle = champTitle.replace(".", "")
        champTitle = champTitle.replace("'", "")
        champTitle = champTitle.replace(/\b(\w)/g, c => c.toUpperCase())
        champTitle = champTitle.replace(/\s+/g, '')
        return champTitle
    }

    getIconString() {
        let champTitle = this.getChampTitle()
        if (champTitle === "Wukong") {
            champTitle = "MonkeyKing"
        }
        if(champTitle=== "Kogmaw"){
            champTitle="KogMaw"
        }

        return dataDragonIcon + champTitle + "_0.jpg"
    }

    render(){

        let champTitle = this.getChampTitle()
        let champIcon = this.getIconString()
        const { classes } = this.props
        let game=this.props.game

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
                                    {game.map} {game.win ?  "Win" :"Losse"}
                                </Typography>
                                <Typography>
                                    KDA {game.kills}/{game.deaths}/{game.assists}                        
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
        )
    }
}


export default withStyles(styles)(GameHistoryItem)