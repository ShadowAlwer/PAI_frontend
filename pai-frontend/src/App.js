import React from 'react';
import { Grid, Button, TextField, Card, CardActionArea, CardContent, CardMedia, Typography, Popper, CircularProgress } from '@material-ui/core';
import ChampionInfo from './components/ChampionInfo'
import { withStyles } from '@material-ui/styles'
import PlayerInfo from './components/PlayerInfo'
import { getChampTitle, getIconString } from './components/Helpers'
import { servers } from './components/Data'
import InfoBrick from './components/InfoBrick';


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
    width: 200,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 6,
    paddingRight: 6,

  },
  option: {
    background: '#484d6d',
    color: "white",
    '&:hover': {
      background: '#2d3044'
    }
  },
  list: {
    color: "white",
    background: '#484d6d',
  },
  menuPaper: {
    background: '#484d6d',
  },
  input: {
    color: "white",
  },
  margin:{
    marginRight:'-16px',
    marginLeft:'-16px',
  }
})


const champStatsGet = "/api/statistics/champion?name="
const playerStatsGet = "/api/statistics/summoner?"

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      server: servers[1],
      name: 'suszek1996',
      champ: false,
      player: false,
      champStats: null,
      playerStats: null,
      anchorEl: null,
      loading: false,
      status: 200,
      message: null,
    }

    this.handleServerChange = this.handleServerChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.searchStats = this.searchStats.bind(this)
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this)
    this.handlePopoverClose = this.handlePopoverClose.bind(this)
    this.handlePopoverClick = this.handlePopoverClick.bind(this)
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

      fetch('/api/game_version')
        .then(response=>{
            return response.json()
        })
        .then(data=>{
            console.log(JSON.stringify(data))
            this.setState({
                version: data.game_version
            })
        })
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

    if (event.target.value.length > 2) {
      this.handlePopoverOpen(event)
    }
    else {
      this.handlePopoverClose()
    }
  }

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.searchStats()
    }
  }

  searchStats() {
    this.handlePopoverClose()
    this.setState({ loading: true, player: false, champ: false })
    let champion = this.state.champions.filter(champ => champ.name === this.state.name.toLowerCase())
    if (champion.length > 0) {
      console.log('Search for champion ' + this.state.name);

      fetch(champStatsGet + this.state.name)
        .then(response => {
          this.setState({ status: response.status})
          return response.json()
        })
        .then(data => {
          console.log(JSON.stringify(data))
          this.setState({
            champStats: data,
            champ: true,
            player: false,
            loading: false,
          })
        });
    }
    else {
      console.log('Search for player ' + this.state.name + ' on server ' + this.state.server.label);

      fetch(playerStatsGet + "region=" + this.state.server.value + "&name=" + this.state.name)
        .then(response => {
          this.setState({ status: response.status})
          return response.json()
        })
        .then(data => {
          console.log(JSON.stringify(data))
          this.setState({
            playerStats: data,
            champ: false,
            player: true,
            loading: false,
            message: data.message
          })
        })
    }
  }

  handlePopoverOpen(event) {
    if (this.state.champions.filter(champ => champ.name.includes(this.state.name.toLowerCase())).length > 0)
      this.setState({
        anchorEl: event.target
      })
  }

  handlePopoverClose() {
    this.setState({
      anchorEl: null
    })
  }


  handlePopoverClick(name) {
    this.handlePopoverClose()
    this.setState({
      name: name
    }, this.searchStats)

  }

  render() {

    const open = Boolean(this.state.anchorEl);
    const id = open ? 'popover' : undefined;
    const { classes } = this.props

    let key = 0
    let popoverContent = <div />
    if (open) {
      popoverContent = this.state.champions.filter(champ => champ.name.includes(this.state.name.toLowerCase())).map((champ) => {

        let champTitle = getChampTitle(champ.name)
        let champIcon = getIconString(champ.name)

        return (<Card key={key++}>
          <CardActionArea className={classes.card} onClick={() => this.handlePopoverClick(champ.name)} >
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
        </Card>)
      })
    }


    console.log('Rendering')
    return (
      <Grid
        container
        justify="center"
        direction="column"
        spacing={2}
        className={classes.margin}>
          <Grid container
            item
            alignItems='center'
            justify='center'
            spacing={2}
            className={classes.margin}>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                value={this.state.name}
                label="Search for a Player or Champion"
                onChange={this.handleNameChange}
                onKeyDown={this.onKeyPress}
                color="secondary"
                fullWidth
                autoFocus={true}
                InputProps={{
                  className: classes.input
                }} />
              <Popper
                id={id}
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.handlePopoverClose}
                children
                placement='bottom-start'
              >
                {popoverContent}
              </Popper>
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="server-select"
                select
                label="Server"
                value={this.state.server.value}
                onChange={this.handleServerChange}
                onKeyDown={this.onKeyPress}
                color="secondary"
                SelectProps={{
                  className: classes.list,
                  MenuProps: {
                    classes: {
                      paper: classes.menuPaper,
                    },
                  }
                }}
              //helperText="Please select server"
              >
                {servers.map(option => (
                  <option className={classes.option} key={option.value} value={option.value} label={option.label}>
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
          <Grid
            item
            container
            spacing={2}
            justify="center"
            alignItems="center"
            direction="column"
            className={classes.margin}>
            {this.state.champ && this.state.status === 200 && <ChampionInfo champStats={this.state.champStats} version={this.state.version} />}
            {this.state.player && this.state.status === 200 && <PlayerInfo playerStats={this.state.playerStats} version={this.state.version} />}
            {this.state.loading && <CircularProgress color="secondary" />}
            {this.state.status !== 200 && !this.state.loading && <InfoBrick prefix={this.state.status + ": "} value={this.state.message} xs={6} />}
          </Grid>

      </Grid>
    )
  }

}

export default withStyles(styles)(App);
