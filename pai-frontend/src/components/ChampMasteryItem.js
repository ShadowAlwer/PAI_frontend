import React from "react"
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

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

const dataDragonIcon = "http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/"


class GameHistoryItem extends React.Component{

    getChampTitle() {
        let champTitle = this.props.mastery.champion_name.replace(/^\w/, c => c.toUpperCase())
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