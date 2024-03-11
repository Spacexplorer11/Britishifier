const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Tells you which commands are available'),
    async execute(interaction) {
       try { await interaction.reply({ content: 'Here are the available commands:\n\n' +
            '/help - Display this help message\n' +
            '/joke - Get a random British joke\n' +
            '/riddle - Get a random British riddle\n' +
            '/cute-kitten - Get a cute kitten picture' +
            '/daily-space-picture - Get the daily space picture from NASA'+
            '/quote - Get a random quote', ephemeral: true});
		} catch (error) {
            console.error(error);
            await interaction.reply({content: 'An error occurred while executing the command.', ephemeral: true});

        }
    },
};