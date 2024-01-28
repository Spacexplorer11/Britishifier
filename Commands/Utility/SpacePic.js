const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios').default;

async function spacePic(message) {
    const apodApiUrl = 'https://api.nasa.gov/planetary/apod';
    const { nasaAPIKey } = require('/workspaces/Britishifier/Config.json'); // Get your API key from the config.JSON file

    try {
        const response = await axios.get(apodApiUrl, {
            params: {
                api_key: nasaAPIKey,
            },
        });

        const imageUrl = response.data.hdurl || response.data.url;

        if (imageUrl) {
           await message.channel.send(imageUrl)
        } else {
            return 'Unable to fetch the space picture.';
        }
    } catch (error) {
        console.error('Error fetching or sending the image:', error);
        return 'Error fetching or sending the image.';
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily-space-picture')
        .setDescription('Sends the picture of the day from NASA'),
    async execute(interaction) {
        try {
            await interaction.reply("Here is the space picture of the day: \n");
            await spacePic(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'An error occurred while executing the command.', ephemeral: true});
        }
    },
};