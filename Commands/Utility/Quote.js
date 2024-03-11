const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');

async function fetchDailyQuote() {
    const quotableApiUrl = 'https://api.quotable.io/random';

    try {
        // Fetch a random quote from the Quotable API
        const response = await axios.get(quotableApiUrl);

        // Extract the quote from the API response
        const quote = response.data.content;

        if (quote) {
            return quote;
        } else {
            throw new Error('Unable to fetch a quote from the API.');
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw new Error('Error fetching quote.');
    }
}

const data = new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Tells you a random quote');

async function execute(interaction) {
    try {
        const quote = await fetchDailyQuote();

        // Send a formatted message to Discord
        await interaction.reply(`The random quote is: \n${quote}`);
    } catch (error) {
        console.error('Error executing quote command:', error);

        // Send an error message to Discord
        await interaction.reply('An error occurred while executing the command.');
    }
}

module.exports = {
    data,
    execute,
};
