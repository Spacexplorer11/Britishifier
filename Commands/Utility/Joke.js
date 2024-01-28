const { SlashCommandBuilder } = require('discord.js');

const historyJoke = [];

const britishJokes = [
    "I asked the librarian if the library had books on paranoia. 'They're right behind you.'",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I'm reading a book on anti-gravity. It's impossible to put down.",
    "Why did the bicycle fall over? Because it was two-tired.",
    "What's a vampire's favorite fruit? A blood orange.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I only know 25 letters of the alphabet, I don't know why.",
    "I told my computer I needed a break, now it won't stop sending me holiday ads.",
    "What do you call fake spaghetti? An impasta.",
    "I used to play piano by ear, but now I use my hands and fingers.",
    "Parallel lines have so much in common, it's a shame they'll never meet.",
    "Why did the tomato turn red? Because it saw the salad dressing.",
    "I used to be a baker because I kneaded dough.",
    "What do you call a pile of cats? A meowtain.",
    "I'm on a whiskey diet, I've lost three days already.",
    "I told my wife she should embrace her mistakes, she gave me a hug."
  ];

  function joke() {
    // Get a random index from the array
    const randomIndex = Math.floor(Math.random() * britishJokes.length);
  
    // Use the random index to get the random element
    const randomElement = britishJokes[randomIndex];
    if (historyJoke.length > 4) {
      historyJoke.splice(4,1);
      console.log("Removed element from historyJoke")
    } 
    if (historyJoke.includes(randomElement)){
      return joke();
    } else {
      historyJoke.unshift(randomElement);
     return randomElement;
    }
  }  

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Say\'s a random British joke'),
    async execute(interaction) {
       try { await interaction.reply(joke());
		} catch (error) {
            console.error(error);
            await interaction.reply({content: 'An error occurred while executing the command.', ephemeral: true});

        }
    },
};