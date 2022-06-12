module.exports = {
  name: 'stats',
  description: "List overwatch stats",

  async execute(messageCreate, args, Discord){
    const axios = require('axios');

    // Obtain platform, region, and battleTag (To search specific player) from args
    const platform = args[0];
    const region = args[1];
    const battleTag = args[2]

    // Obtain specific player data into playerData
    let getPlayerData = async () =>{
      let response = await axios.get('https://ow-api.com/v1/stats/'+platform+'/'+region+'/'+battleTag+'/profile');
      let data = response.data;
      return data;
    }
    let playerData = await getPlayerData();

    // Retrieved rating, name, icon, and winRate of player
    // .toString() because value in .addFields only allows for Strings
    const rating = playerData.rating.toString();
    const name = playerData.name;
    const icon = playerData.icon;

    // If zero games are played then winrate is 0
    // winRate is fixed to two decimal places
    let winRate = 0+"%";
    if(playerData.competitiveStats.games.played != 0){
      winRate = ((((playerData.competitiveStats.games.won / playerData.competitiveStats.games.played)*100).toFixed(0))+"%");
    }

    // Create embed and its features (Player Name, Win Rate, Rating)
    const newEmbed = new Discord.MessageEmbed()
    .setColor('#f55812')
    .setTitle('Overwatch Player Stats')
    .setThumbnail(icon)
    .addFields(
      {name: 'Player Name:', value: name},
      {name: 'Win Rate:', value: winRate},
      {name: 'Rating:', value: rating}
    );

    messageCreate.channel.send({embeds: [newEmbed]});
  }
}
