import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const dataDragonIcon = "http://ddragon.leagueoflegends.com/cdn/"

const styles = theme => ({
    paper: {
        root: {

        },
        background: '#363538',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    margin:{
        marginLeft:'8px'
    }
})

class InfoBrick extends React.Component {


    render() {

        let variant = this.props.variant ? this.props.variant : "h6"
        let xs = this.props.xs ? this.props.xs : 2

        let itemIcon
        if (typeof this.props.image !== "undefined") {
            itemIcon = this.props.link ? this.props.link : dataDragonIcon + this.props.version + "/img/item/" + this.props.value + ".png"
            console.log(itemIcon)
        }

        let { classes } = this.props

        let content = (<Paper className={classes.paper} >
            <Typography component="h6" variant={variant} className={classes.margin}>
                {this.props.prefix} {this.props.value} {this.props.sufix}
            </Typography>
        </Paper>)

        if (typeof this.props.image !== "undefined") {

            content = (<Paper className={classes.paper}>
                <Typography component="h6" variant={variant} className={classes.margin}>
                    {this.props.prefix}
                </Typography>
                <img src={itemIcon} alt="item" width="32" height="32" />
            </Paper>)
        }
        return (
            <Grid item xs={xs}>
                {content}
            </Grid>
        )
    }

}

export default withStyles(styles)(InfoBrick);