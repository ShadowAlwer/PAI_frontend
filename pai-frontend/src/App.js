import React from 'react';
import { Grid, Button, TextField, Popover, Card, CardActionArea, CardContent, CardMedia, Typography, Popper } from '@material-ui/core';
import ChampionInfo from './components/ChampionInfo'
import { withStyles } from '@material-ui/styles'
import PlayerInfo from './components/PlayerInfo'

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
})


const dataDragonIcon = "http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/"
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
      anchorEl:null,
    }

    this.handleServerChange = this.handleServerChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.searchStats = this.searchStats.bind(this)
    this.handlePopoverOpen=this.handlePopoverOpen.bind(this)
    this.handlePopoverClose=this.handlePopoverClose.bind(this)
    this.handlePopoverClick=this.handlePopoverClick.bind(this)
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

    if(event.target.value.length>2){
      this.handlePopoverOpen(event)
    }
    else{
      this.handlePopoverClose()
    }
  }

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.searchStats()
    }
  }

  searchStats() {
    let champion = this.state.champions.filter(champ => champ.name === this.state.name.toLowerCase())
    if (champion.length > 0) {
      console.log('Search for champion ' + this.state.name);

      fetch(champStatsGet + this.state.name)
        .then(response => {
          return response.json()
        })
        .then(data => {
          //console.log(JSON.stringify(data))
          this.setState({
            champStats: data,
            champ: true,
            player: false
          })
        });
    }
    else {
      console.log('Search for player ' + this.state.name + ' on server ' + this.state.server.label);

      fetch(playerStatsGet + "region=" + this.state.server.value + "&name=" + this.state.name)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(JSON.stringify(data))
          this.setState({
            playerStats: data,
            champ: false,
            player: true
          })
        });

    }
  }

  handlePopoverOpen(event){
    if(this.state.champions.filter(champ => champ.name.includes(this.state.name.toLowerCase())).length>0)
    this.setState({
      anchorEl: event.target
    })
  }

  handlePopoverClose(){
      this.setState({
          anchorEl:null
        })
  }

  getChampTitle(champ_name) {
    let champTitle = champ_name.replace(/^\w/, c => c.toUpperCase())
    champTitle = champTitle.replace(".", "")
    champTitle = champTitle.replace("'", "")
    champTitle = champTitle.replace(/\b(\w)/g, c => c.toUpperCase())
    champTitle = champTitle.replace(/\s+/g, '')
    return champTitle
}

getIconString(champ_name) {
    let champTitle = this.getChampTitle(champ_name)
    if (champTitle === "Wukong") {
        champTitle = "MonkeyKing"
    }
    if(champTitle=== "Kogmaw"){
        champTitle="KogMaw"
    }

    return dataDragonIcon + champTitle + "_0.jpg"
}

  handlePopoverClick(name){
    console.log("Click popover")
    this.setState({
      name: name
    })
    
  }

  render() {

    const open = Boolean(this.state.anchorEl);
    const id = open ? 'popover' : undefined;
    const{classes}=this.props
    
    let popoverContent=null
    if(open){
      popoverContent=this.state.champions.filter(champ => champ.name.includes(this.state.name.toLowerCase())).map((champ)=>{

        let champTitle = this.getChampTitle(champ.name)
        let champIcon = this.getIconString(champ.name)

        return(<Card>
        <CardActionArea className={classes.card} onClick={()=>this.handlePopoverClick(champ.name)} >
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
      </Card>)})
    }


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
                fullWidth 
                autoFocus={true}/>
                <Popper
                  id={id}
                  open={open}
                  anchorEl={this.state.anchorEl}
                  onClose={this.handlePopoverClose}
                  placement='bottom-start'
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
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
            {this.state.champ && <ChampionInfo champStats={this.state.champStats} />}
            {this.state.player && <PlayerInfo playerStats={this.state.playerStats} />}
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default withStyles(styles)(App);
