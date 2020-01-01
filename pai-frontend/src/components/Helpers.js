
  const dataDragonIcon = "http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/"

export function  getChampTitle(champ_name) {
    let champTitle = champ_name.replace(/^\w/, c => c.toUpperCase())
    champTitle = champTitle.replace(".", "")
    champTitle = champTitle.replace("'", "")
    champTitle = champTitle.replace(/\b(\w)/g, c => c.toUpperCase())
    champTitle = champTitle.replace(/\s+/g, '')

    if(champTitle==="JarvanIv"){
        champTitle="JarvanIV"
      }

    return champTitle
}

export function getIconString(champ_name) {
    let champTitle = getChampTitle(champ_name)
    if (champTitle === "Wukong") {
        champTitle = "MonkeyKing"
    }
    if(champTitle=== "Kogmaw"){
        champTitle="KogMaw"
    }

    return dataDragonIcon + champTitle + "_0.jpg"
}