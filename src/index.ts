import { Client, Events, GatewayIntentBits } from "discord.js";
import { registerCommands } from "./scripts/register";
import { BaseInteraction } from "discord.js";
import { SlashCommandObject } from "./scripts/types/SlashCommandObject";
import { slashCommands } from "./commands";
import { configDotenv } from "dotenv";
import { triggerMinutelyUpdate } from "./timer";
configDotenv();
let commands: SlashCommandObject;

const client = new Client({
	intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildIntegrations
    ],
});

client.once(Events.ClientReady, async (client) => {
	console.log(`✅ Ready! Logged in as ${client.user?.tag}`);
	commands = await registerCommands(slashCommands);
    triggerMinutelyUpdate(client);
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
    console.log('aaa', interaction.client.channels.cache.get('1107965927506575401'));
	if (interaction.isChatInputCommand()) {
		await commands[interaction.commandName].onCommandExecuted(interaction);
	} else if (interaction.isButton()) {
		await commands[
			String(interaction.message.interaction?.commandName)
		].onButtonPressed?.(interaction);
	} else if (interaction.isStringSelectMenu()) {
		await commands[
			String(interaction.message.interaction?.commandName)
		].onMenuSelected?.(interaction);
	} else if (interaction.isAutocomplete()) {
		await commands[String(interaction.commandName)].onAutoCompleteInputed?.(
			interaction
		);
	}
});

client.login(process.env.TOKEN);
