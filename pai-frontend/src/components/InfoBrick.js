import React from 'react'
import { Grid,  Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const dataDragonIcon = "http://ddragon.leagueoflegends.com/cdn/9.3.1/img/item/"

const styles = theme => ({
    paper: {

        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
})

class InfoBrick extends React.Component{


    render(){

        let variant=this.props.variant ? this.props.variant: "h6"
        let xs= this.props.xs ? this.props.xs: 2
        let itemIcon=dataDragonIcon+this.props.value+".png"
        let{classes}=this.props

        let content=(<Paper >
                        <Typography component={variant} variant={variant}>
                            {this.props.prefix} {this.props.value} {this.props.sufix}
                        </Typography>
                    </Paper>)

        if(typeof this.props.image!=="undefined"){
            
            content=(<Paper className={classes.paper}>
                        <Typography component={variant} variant={variant}>
                            {this.props.prefix} 
                        </Typography>
                        <img src={itemIcon} alt="item" width="32" height="32"/>
                    </Paper>)
        }
        return(
            <Grid item xs={xs}>
                {content}
            </Grid>
        )
    }

}

export default withStyles(styles)(InfoBrick);