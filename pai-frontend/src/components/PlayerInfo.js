import React from 'react'
import { Grid, Card, CardActionArea, CardMedia, Paper, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const AnimationName = "anim-name"

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
        '0%': {
            backgroundPosition: '0% 50%'
        },
        '50%': {
            backgroundPosition: '100% 50%'
        },
        '100%': {
            backgroundPosition: '0% 50%'
        },
    },
    [`@keyframes ${AnimationName}`]: {
        '0%': {
            backgroundPosition: '0% 50%'
        },
        '50%': {
            backgroundPosition: '100% 50%'
        },
        '100%': {
            backgroundPosition: '0% 50%'
        },
    },
})

const dataDragonIcon = "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/profileicon/"

class PlayerInfo extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            playerStats: props.playerStats,
        }

    }

    static getDerivedStateFromProps(props, state) {
        let nameProps = props.playerStats.name
        let nameState = state.playerStats.name
        console.log(nameProps !== nameState)
        if (nameProps !== nameState) {
            return {
                playerStats: props.playerStats
            };
        }
        return null;
    }


    render() {
        let playerIcon = dataDragonIcon + this.state.playerStats.profile_icon_id + ".png"
        let playerName = this.state.playerStats.name
        const { classes } = this.props

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
                                alt={playerName}
                                image={playerIcon}
                                title={playerName}
                            />
                            <CardContent className={classes.content}>
                                <Typography component="h4" variant="h4">
                                    {playerName}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item container xs={12} className={classes.card} spacing={2}>
                    <Grid item xs={4} />
                    <Grid item xs={2}>
                        <Paper>
                            <Typography component="h6" variant="h6">
                                LVL {this.state.playerStats.summoner_level}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper>
                            <Typography component="h6" variant="h6">
                                Mastery {this.state.playerStats.mastery_score}
                            </Typography>
                        </Paper>
                    </Grid>
                    </Grid>
            </Grid>
        )
    }
}


export default withStyles(styles)(PlayerInfo);