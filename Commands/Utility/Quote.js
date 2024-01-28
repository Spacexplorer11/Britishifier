const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchDailyQuote() {
    const jsFeedUrl = 'https://www.brainyquote.com/link/quotebr.js';

    try {
        // Fetch the JavaScript feed content
        const response = await axios.get(jsFeedUrl);

        // Load the HTML content into Cheerio
        const $ = cheerio.load(response.data);

        // Extract the quote from the relevant HTML element
        const quote = $('.bqQuoteLink').text().trim();

        if (quote) {
            return quote;
        } else {
            throw new Error('Unable to extract quote from the JavaScript feed.');
        }
    } catch (error) {
        console.error('Error fetching BrainyQuote quote:', error);
        throw new Error('Error fetching BrainyQuote quote.');
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily-quote')
        .setDescription('Tells you the quote of the day'),
    async execute(interaction) {
        try {
            const quote = await fetchDailyQuote();
            await interaction.reply(`The quote of the day is: \n${quote}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while executing the command.');
        }
    },
};
