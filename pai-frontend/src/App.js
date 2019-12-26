import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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




class App extends React.Component {

  constructor() {
    super()

    this.state = {
      server: servers[1],
      name: 'Ahri',
    }

    this.handleServerChange = this.handleServerChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }


  componentDidMount() {
    fetch('/api/champions')
      .then(response => {
        console.log('!')
        return response.json()
      })
      .then(data => {
        console.log(JSON.stringify(data))
        this.setState({ champions: data })
      });
  }


  handleServerChange(event) {
    let server = servers.filter(serv => serv.value === event.target.value)
    console.log(JSON.stringify(this.state.champions))
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
      let champion = this.state.champions.filter(champ => champ.name === this.state.name.toLowerCase())
      if (champion.length > 0) {
        console.log('Search for champion ' + this.state.name);
      }
      else {
        console.log('Search for player ' + this.state.name + ' on server ' + this.state.server.label);
      }
      // write your functionality here
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
            <Grid item xs={2} />
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                value={this.state.name}
                label="Search for a Player or Champion"
                onChange={this.handleNameChange}
                onKeyDown={this.onKeyPress}
                fullWidth />
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={2} />
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={3}
            justify="center"
            alignItems="center"
            direction="column">
            {true && (<ChampionInfo />)}
            {true && (<ChampionInfo />)}
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default App;
