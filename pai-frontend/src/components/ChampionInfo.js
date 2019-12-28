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

const iconString=process.env.PUBLIC_URL+"/resources/img/champion/tiles/"
const dataDragonIcon ="http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/"
//lower.replace(/^\w/, c => c.toUpperCase());


class ChampionInfo extends React.Component {

    constructor(props) {
        super(props)

        this.state={
            champStats: props.champStats
        }
    }

    static getDerivedStateFromProps(props, state) {
        // Any time the current user changes,
        // Reset any parts of state that are tied to that user.
        // In this simple example, that's just the email.
        let nameProps=props.champStats.champion_name
        let nameState=state.champStats.champion_name
        console.log(nameProps !== nameState)
        if (nameProps !== nameState) {
          return {
            champStats: props.champStats
          };
        }
        return null;
      }

      getChampTitle(){
          return  this.state.champStats.champion_name.replace(/^\w/, c => c.toUpperCase())
      }

      getIconString(){
        let champTitle=this.getChampTitle()
        if(champTitle==="Wukong"){
            champTitle="MonkeyKing"
        }

        return dataDragonIcon+champTitle+"_0.jpg"
      }

    render() {

        let champTitle=this.getChampTitle()
        let champIcon =this.getIconString()
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
                            <CardActionArea className={classes.card} >
                                <CardMedia
                                    className={classes.icon}
                                    component="img"
                                    alt= {champTitle}
                                    image={champIcon}
                                    title= {champTitle}
                                />
                                <CardContent className={classes.content}>
                                    <Typography component="h4" variant="h4">
                                        {champTitle}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item container xs={12} className={classes.card}>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                KDA {this.state.champStats.average_kills.toPrecision(3)}
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Win Rate {this.state.champStats.win_rate.toPrecision(3)}%
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Play Rate {this.state.champStats.play_rate.toPrecision(3)}%
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Ban Rate {this.state.champStats.ban_rate.toPrecision(3)}% 
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Lane {this.state.champStats.lane}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item container xs={12} className={classes.card}>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Damage Dealt {this.state.champStats.average_damage_defeat.toFixed()}
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Damage Dealt To Objectives {this.state.champStats.average_damage_to_objectives.toFixed()}
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Damage Taken {this.state.champStats.average_damage_taken.toFixed()}
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Gold Earned {this.state.champStats.average_gold_earned.toFixed()}
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                First Tower {this.state.champStats.first_tower.toPrecision(3)}%
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item container xs={12} className={classes.card}>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Vision Score {this.state.champStats.average_vision_score.toPrecision(3)}
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Total Heal {this.state.champStats.average_total_heal.toFixed()}
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Champion Level {this.state.champStats.average_champion_level.toPrecision(3)}
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                First Blood Kill {this.state.champStats.first_blood_kill.toPrecision(3)}%
                            </Typography>
                        </Paper>
                        <Paper item xs={2}>
                            <Typography component="h6" variant="h6">
                                Duration {(this.state.champStats.average_game_duration/60).toPrecision(3)} min
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
        )
    }
}

export default withStyles(styles)(ChampionInfo);