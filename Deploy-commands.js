const { REST, Routes } = require('discord.js');
const { clientId, token } = require ('/workspaces/Britishifier/Config.json');
const { readdirSync, statSync } = require ('node:fs');
const { join } = require ('node:path');

// Function to recursively collect commands from subdirectories
function collectCommands(directoryPath) {
    const commands = new Map();

    const items = readdirSync(directoryPath);

    for (const item of items) {
        const itemPath = join(directoryPath, item);
        const isDirectory = statSync(itemPath).isDirectory();

        if (isDirectory) {
            // Recursively collect commands from subdirectories
            const subCommands = collectCommands(itemPath);
            subCommands.forEach((command, name) => {
                console.log(`Collected command: ${name} from ${itemPath}`);
                if (commands.has(name)) {
                    console.log(`[WARNING] Duplicate command name found: ${name}`);
                    console.log(`  - First instance: ${commands.get(name).path}`);
                    console.log(`  - Second instance: ${itemPath}`);
                } else {
                    commands.set(name, command);
                }
            });
        } else if (item.endsWith('.js')) {
            // Process only JavaScript files
            try {
                const command = require (itemPath);

                if ('data' in command && 'execute' in command) {
                    // Ensure the command name is unique
                    const { name } = command.data.toJSON();
                    if (commands.has(name)) {
                        console.log(`[WARNING] Duplicate command name found: ${name}`);
                        console.log(`  - First instance: ${commands.get(name).path}`);
                        console.log(`  - Second instance: ${itemPath}`);
                    } else {
                        commands.set(name, { command });
                    }
                } else {
                    console.log(`[WARNING] The command at ${itemPath} is missing a required "data" or "execute" property.`);
                }
            } catch (error) {
                console.log(`[ERROR] Error loading command = require ${itemPath}: ${error.message}`);
            }
        }
    }

    return commands;
}

// Export a function to execute the command deployment
module.exports = async function deployCommands(directoryPath) {
    const commandMap = collectCommands(directoryPath || join(__dirname, 'Commands'));
    const commands = [...commandMap.values()];
    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(token);
    console.log(`Deploying commands: ${JSON.stringify(commands, null, 2)}`);
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands.map(command => ({ name: command.command.data.name, ...command.command.data.toJSON() })) },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
};
