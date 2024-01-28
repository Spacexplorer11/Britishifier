const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const historyRiddle = [];

const britishRiddles = [
    "I'm a famous clock in London, standing tall and proud.",
    "People cross me with caution, yet I'm not a river.",
    "In Britain, I'm served with tea, often topped with cream and jam.",
    "I have a royal guard and a famous palace.",
    "I'm known for my detective skills and reside at 221B Baker Street.",
    "In castles, you'll find me on the dining table, holding beverages with elegance.",
    "I'm a red, double-decker mode of transport in London.",
    "The Queen's home is surrounded by me, a beautiful outdoor space.",
    "In the UK, I'm a popular dish made with fish and chips.",
    "I'm a famous bridge in London, often mistaken for a tower.",
    "People ride me in London to get around the city quickly.",
    "I'm a mythical creature on the Scottish coat of arms.",
    "I'm the famous river that flows through the heart of London.",
    "You'll find me on every street, providing information and directions.",
    "I'm a traditional Scottish dish made with oats and water.",
    "I'm a red flower, a symbol of England.",
    "People in Britain love to have me with their afternoon tea.",
    "I'm a university city in England with a prestigious history.",
    "I'm a sport loved by the British, played with a round ball.",
    "I'm a famous fictional spy with a license to kill.",
    "In Scotland, I'm a musical instrument often played at events.",
    "I'm a famous square in London, known for performances and protests.",
    "I'm the capital city of England, bustling with culture and history.",
    "I'm a type of hat often associated with Sherlock Holmes.",
    "You'll find me in the British countryside, hopping around with long ears.",
    "I'm a famous lake in Scotland, home to a mythical creature.",
    "I'm a popular British dessert made with layers of sponge, jam, and cream.",
    "I'm a historic castle in Northern Ireland, perched on a basalt cliff.",
    "I'm a famous British rock band, known for hits like 'Bohemian Rhapsody.'",
  ];
  
  const britishRiddleAnswers = [
    "Big Ben",
    "Zebra Crossing",
    "Scone",
    "Buckingham Palace",
    "Sherlock Holmes",
    "Chalice",
    "Double-Decker Bus",
    "Garden",
    "Fish and Chips",
    "Tower Bridge",
    "London Tube",
    "Unicorn",
    "Thames",
    "Street Sign",
    "Porridge",
    "Rose",
    "Crumpet",
    "Oxford",
    "Football",
    "James Bond",
    "Bagpipes",
    "Trafalgar Square",
    "London",
    "Deerstalker",
    "Rabbit",
    "Loch Ness",
    "Trifle",
    "Dunluce Castle",
    "Queen",
    "Queen",
  ];

async function riddle(message) {
    return new Promise(async (resolve) => {
      const randomIndex = Math.floor(Math.random() * britishRiddles.length);
      const randomElementR = britishRiddles[randomIndex];
      const randomElementA = britishRiddleAnswers[randomIndex];
      if (historyRiddle.length > 4) {
        historyRiddle.splice(4,1);
        console.log("Removed element from historyRiddle")
      } 
      if (historyRiddle.includes(randomIndex)){
        return riddle();
      } else {
        historyRiddle.unshift(randomIndex);
      if (message && message.channel) {
        await message.channel.send(randomElementR);
  
        let countdown = 20;
        const countdownInterval = setInterval(() => {
          if (countdown > 1) {
            message.channel.send(`Time remaining: ${countdown} seconds`);
          } else if(countdown === 1) {
            message.channel.send(`Time remaining: ${countdown} second`);
          }else {
            clearInterval(countdownInterval);
            resolve({ riddles: randomElementR, answer: randomElementA });
          }
          countdown--;
        }, 1000);
  
        const filter = (response) => !response.author.bot;
        const collector = message.channel.createMessageCollector({ filter, time: 20000 });
  
        collector.on('collect', async (response) => {
          if (response.content.toLowerCase().trim() === randomElementA.toLowerCase().trim()) {
            clearInterval(countdownInterval);
            collector.stop();
            await message.channel.send(`Correct answer from ${response.author.tag}!`);
            console.log(`Sent the "Correct answer" message to ${response.author.tag}`);
            resolve({ riddles: randomElementR, answer: randomElementA });
            return;
          } else {
            await message.channel.send(`Wrong answer from ${response.author.tag}.`);
            console.log(`Sent the "Wrong answer" message to ${response.author.tag}`);
          }
        });
  
        collector.on('end', (collected, reason) => {
          if (reason === 'time' && !collected.size) {
            message.channel.send("Time's up! The correct answer is: " + randomElementA);
            console.log(`Sent the "Time's up" message.`)
            resolve({ riddles: randomElementR, answer: randomElementA });
          }
        });
      }
    }
    });
  }

  module.exports = {
    data: new SlashCommandBuilder()
        .setName('riddle')
        .setDescription('Say\'s a random British riddle, and gives you 20secs to solve it.'),
    async execute(interaction) {
        try {

            //Confirmation and cancel buttons
            const confirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Confirm')
            .setStyle(ButtonStyle.Success);
      
          const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Primary);


            //Add the buttons as components
            const row = new ActionRowBuilder()
            .addComponents(cancel, confirm);

            //Ask the user if they wish to confirm
          const response = await interaction.reply({content: "Please confirm that you wish to request a British riddle:",
          components: [row], ephemeral: true });
            

          //Make sure only the original user can respond:
          const collectorFilter = i => i.user.id === interaction.user.id;

try {
	const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

  if (confirmation.customId === 'confirm') {
    interaction.followUp({content: "The action has been confirmed and the riddle has started", ephemeral: true})
		          // Run the riddle function
            await riddle(interaction);
		await confirmation.update("Riddle has started due to it being confirmed");
    collectorFilter.stop();
	} else if (confirmation.customId === 'cancel') {
		await confirmation.update({ content: 'Action cancelled', components: [] });
	}

} catch (e) {
	await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
}
        } catch (error) {
            console.error(error);
            await interaction.followUp({content:'An error occurred while executing the command.', ephemeral: true});
        }
    },
};