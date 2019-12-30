import React from 'react'
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import InfoBrick from './InfoBrick'


const AnimationName="anim-name"

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
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 6,
        paddingRight: 6,

    },
    footer: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    gradientAnim: {

        display: 'flex',
        background: 'linear-gradient(270deg, #00dafb, #fbea00, #fb2300, #02b900, #fb00db)',
        backgroundSize: '1000% 1000%',

        //WebkitAnimation: 'AnimationName 31s ease infinite',
        MozAnimation: `$${AnimationName} 31s ease infinite`,
        animation: `$${AnimationName} 31s ease infinite`,
        /*  
          '@webkit-keyframes AnimationName': {
              '0%':{backgroundPosition:'0% 50%'},
              '50%':{backgroundPosition:'100% 50%'},
              '100%':{backgroundPosition:'0% 50%'},
          },*/       
    },
    [`@-moz-keyframes ${AnimationName}`]: {
        '0%':{
            backgroundPosition:'0% 50%'
          },
        '50%':{
            backgroundPosition:'100% 50%'
          },
        '100%':{
            backgroundPosition:'0% 50%'
          },
    },
      [`@keyframes ${AnimationName}`]: {
          '0%':{
              backgroundPosition:'0% 50%'
            },
          '50%':{
              backgroundPosition:'100% 50%'
            },
          '100%':{
              backgroundPosition:'0% 50%'
            },
      },
})

//const iconString = process.env.PUBLIC_URL + "/resources/img/champion/tiles/"
const dataDragonIcon = "http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/"


class ChampionInfo extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            champStats: props.champStats
        }
    }

    static getDerivedStateFromProps(props, state) {
        let nameProps = props.champStats.champion_name
        let nameState = state.champStats.champion_name
        console.log(nameProps !== nameState)
        if (nameProps !== nameState) {
            return {
                champStats: props.champStats
            };
        }
        return null;
    }

    getChampTitle() {
        let champTitle = this.state.champStats.champion_name.replace(/^\w/, c => c.toUpperCase())
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

    render() {

        let champTitle = this.getChampTitle()
        let champIcon = this.getIconString()
        const { classes } = this.props

        console.log(JSON.stringify(this.state.champStats))
        return (
            <Grid item container
                spacing={2}
                justify="center"
                alignItems="center"
                direction="column">
                <Grid item xs={12}  >
                    <Card>
                        <CardActionArea className={classes.gradientAnim} >
                            <CardMedia
                                className={classes.icon}
                                component="img"
                                alt={champTitle}
                                image={champIcon}
                                title={champTitle}
                            />
                            <CardContent className={classes.content}>
                                <Typography component="h4" variant="h4">
                                    {champTitle}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item container xs={12} className={classes.card} spacing={2}>
                    <Grid item xs={1} />
                    <InfoBrick prefix="KDA" value={this.state.champStats.average_kills.toFixed(1)+"/"+this.state.champStats.average_deaths.toFixed(1)+"/"+this.state.champStats.average_assists.toFixed(1)}/>
                    <InfoBrick prefix="Win rate" value={this.state.champStats.win_rate.toPrecision(3)} sufix="%" />
                    <InfoBrick prefix="Play rate" value={this.state.champStats.play_rate.toPrecision(3)} sufix="%" />
                    <InfoBrick prefix="Ban rate" value={this.state.champStats.ban_rate.toPrecision(3)} sufix="%"/>
                    <InfoBrick prefix="Lane" value={this.state.champStats.lane}/>
                </Grid>
                <Grid item container xs={12} className={classes.card} spacing={2}>
                    <Grid item xs={1} />
                    <InfoBrick prefix="DMG Dealt" value={this.state.champStats.average_damage_defeat.toFixed()}/>
                    <InfoBrick prefix="Objective DMG" value={this.state.champStats.average_damage_to_objectives.toFixed()}/>
                    <InfoBrick prefix="DMG Taken" value={this.state.champStats.average_damage_taken.toFixed()}/>
                    <InfoBrick prefix="Avg Gold " value={this.state.champStats.average_gold_earned.toFixed()} />
                    <InfoBrick prefix="First Tower" value={this.state.champStats.first_tower.toFixed(2)} sufix="%" />
                </Grid>
                <Grid item container xs={12} className={classes.card} spacing={2}>
                    <Grid item xs={1} />
                    <InfoBrick prefix="Avg Vision " value={this.state.champStats.average_vision_score.toFixed()} />
                    <InfoBrick prefix="Avg Heal" value={this.state.champStats.average_total_heal.toFixed()} />
                    <InfoBrick prefix="Avg LVL" value={this.state.champStats.average_champion_level.toFixed()} />
                    <InfoBrick prefix="First Blood" value={this.state.champStats.first_blood_kill.toFixed(2)} sufix="%" />
                    <InfoBrick prefix="Duration" value={Math.ceil(this.state.champStats.average_game_duration / 60)} sufix="min" />
                </Grid>
                <Grid item container xs={12} className={classes.card} spacing={2}>
                    <Grid item xs={1} />
                    <InfoBrick prefix="CS per min" value={this.state.champStats.cs_per_minute.toFixed()} />
                    <InfoBrick prefix="First item" value={this.state.champStats.first_item_id} image />
                </Grid>
                <Grid item container xs={12} className={classes.footer} spacing={2} >
                    <Grid item xs={1} />
                    <InfoBrick prefix="Game analized" value={this.state.champStats.analyzed_games} variant="subtitle1"/>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(ChampionInfo);