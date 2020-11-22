require("dotenv").config()
const Discord = require("discord.js") 
const client = new Discord.Client() 

client.on("ready", () => { 
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => { 

//	if (msg.content === "ping") { 
//		msg.reply("Pong!")
//  	}

	// example usage: !il 100
	var command = msg.content.split(' ');
	if (command.length == 2 && ["!il","!IL","!Il","!iL"].indexOf(command[0]) >= 0 && !isNaN(command[1])) {
		// get price from inputs
		var price1 = command[1] / 100
		var price2 = 0
		// weights are 50 50 for LP pools
		var weight1 = 50 / 100; 
		var weight2 = 50 / 100;
		// calculations
		var deltaP = (1+price1)/(1+price2);
		var iL = (1-(Math.pow(deltaP,weight1)/(weight1 * deltaP + weight2))) * 100;
		iL = iL.toFixed(2);
		// return response
		//msg.reply("Impermanent Loss: " + iL +"%").then(() => console.log(`${Date(Date.now()).toString()} Sent a reply to: ${msg.author.username} iL:${iL} p1:${command[1]} p2:${command[2]}`)).catch(console.error);
	
		const embededResponse = new Discord.MessageEmbed() 
			.setColor('#0099ff') 
			.setTitle(':tractor: Impermanent Loss Calculator')  
				.addFields(
				{ name: 'Impermanent Loss: `'+ iL + '%`', value: '`'+command[1]+'%` change in price between assets results in `'+ iL +'%` impermanent loss compared to holding the original funds supplied.'} )
			.setImage('https://pbs.twimg.com/media/EnWudW6XEAYAyk1?format=png&name=small');
		msg.reply(embededResponse);
	}
})


client.login(process.env.BOT_TOKEN)


