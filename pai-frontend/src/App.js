import React from 'react';
import {Grid, Button, TextField} from '@material-ui/core';
import ChampionInfo from './components/ChampionInfo'

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

const champStatsGet="/api/statistics/champion?name="


class App extends React.Component {

  constructor() {
    super()

    this.state = {
      server: servers[1],
      name: 'Ahri',
      champ: false,
      player: false,
      champStats: null,
      playerStats:null,
    }

    this.handleServerChange = this.handleServerChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.searchStats= this.searchStats.bind(this)
  }


  componentDidMount() {
    fetch('/api/champions')
      .then(response => {
        return response.json()
      })
      .then(data => {
        //console.log(JSON.stringify(data))
        this.setState({ champions: data })
      });
  }


  handleServerChange(event) {
    let server = servers.filter(serv => serv.value === event.target.value)
    this.setState({
      server: server[0]
    })
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
        this.searchStats()
    }
  }

  searchStats(){
    let champion = this.state.champions.filter(champ => champ.name === this.state.name.toLowerCase())
    if (champion.length > 0) {
      console.log('Search for champion ' + this.state.name);

      fetch(champStatsGet+this.state.name)
      .then(response => {
        return response.json()
      })
      .then(data => {
        //console.log(JSON.stringify(data))
        this.setState({ champStats: data, 
                        champ: true,
                        player: false })
      });
    }
    else {
      console.log('Search for player ' + this.state.name + ' on server ' + this.state.server.label);
    }
  }


  render() {
    console.log('Rendering')
    return (
      <Grid
        container
        justify="center"
        direction="column"
        spacing={2}>
        <Grid item>
          <Grid container
            spacing={2}
            alignItems='center'
            justify='center'>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                value={this.state.name}
                label="Search for a Player or Champion"
                onChange={this.handleNameChange}
                onKeyDown={this.onKeyPress}
                fullWidth />
            </Grid>
            <Grid item xs={1}>
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
              //helperText="Please select server"
              >
                {servers.map(option => (
                  <option key={option.value} value={option.value} label={option.label}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={this.searchStats}>
              Search
            </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            direction="column">
            {this.state.champ && (<ChampionInfo champStats={this.state.champStats}/>)}
            {this.state.player && (<ChampionInfo />)}
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default App;
