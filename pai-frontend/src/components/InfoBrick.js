import React from 'react'
import { Grid,  Paper, Typography } from '@material-ui/core'

class InfoBrick extends React.Component{

    render(){

        let variant=this.props.variant ? this.props.variant: "h6"
        let xs= this.props.xs ? this.props.xs: 2
        return(
            <Grid item xs={xs}>
            <Paper>
                <Typography component={variant} variant={variant}>
                    {this.props.prefix} {this.props.value} {this.props.sufix}
                </Typography>
            </Paper>
        </Grid>
        )
    }

}

export default InfoBrick;