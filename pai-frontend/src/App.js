import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const servers = [
  {
    value: 'KR',
    label: 'KR',
  },
  {
    value: 'EUN1',
    label: 'EUNE',
  },
  {
    value: 'EUW1',
    label: 'EUW',
  },
  {
    value: 'RU',
    label: 'RU',
  },
  {
    value: 'JP1',
    label: 'JP',
  },
  {
    value: 'BR1',
    label: 'BR',
  },  
  {
    value: 'LA1',
    label: 'LAN',
  },
  {
    value: 'LA2',
    label: 'LAS',
  },
  {
    value: 'NA1',
    label: 'NA',
  },
  {
    value: 'OC1',
    label: 'OCE',
  },
  {
    value: 'TR1',
    label: 'TR',
  },
];




class App extends React.Component{

  constructor(){
    super()
    this.state={
      server: servers[1],
      name: 'Ahri',
    }

    this.handleServerChange=this.handleServerChange.bind(this)
    this.handleNameChange=this.handleNameChange.bind(this)
  }

  handleServerChange(event){
    let server=servers.filter(serv=>serv.value===event.target.value)
    //console.log(JSON.stringify(server[0]))
    this.setState({
        server: server[0]
    })
  }

  handleNameChange(event){
    this.setState({
      name: event.target.value
    })
  }

  onKeyPress= (e) => {
    if (e.keyCode === 13) {
      console.log('Search for '+ this.state.name + ' on server '+ this.state.server.label);
      // write your functionality here
    }
  }



  render(){
    console.log('Rendering')
    return(
      <Grid container  
        spacing={2} 
        alignItems='center' 
        justify='center'>
          <Grid item xs={2}/>
          <Grid item xs={5}>
            <TextField 
              id="standard-basic"
              value={this.state.name} 
              label="Search for a Player or Champion"
              onChange={this.handleNameChange}
              onKeyDown={this.onKeyPress} 
              fullWidth/>
          </Grid>
          <Grid item xs={3}>
          <TextField
            id="server-select"
            select
            label="Server"
            value={this.state.server.value}
            onChange={this.handleServerChange}
            onKeyDown={this.onKeyPress}
            SelectProps={{
              native: true,
            }}
            helperText="Please select server"
          >
            {servers.map(option => (
              <option key={option.value} value={option.value} label={option.label}>
                {option.label}
              </option>
            ))}
          </TextField>
          </Grid>
          <Grid item xs={2}/>
      </Grid>
    )
  }

}

export default App;