import { Client, TextChannel } from "discord.js";
import { prisma } from "../database";

const { DISCORD_CHANNEL_ID } = process.env;

export async function sendFileOnScheduleToTextChannel(client: Client) {

	const channel = client.channels.cache.get(
		process.env.DISCORD_CHANNEL_ID as string
	);

	if (!channel) {
		throw new Error("Channel not found");
	}
	if (!channel.isTextBased()) {
		throw new Error("Channel is not a text channel");
	}

	if (!DISCORD_CHANNEL_ID) {
		throw new Error("Channel not found");
	}

	const now = new Date();
	const currentHHMM = `${now.getHours()}:${now.getMinutes()}`;

	const exportFile = await prisma.exportFile.findFirst({
        where: { schedule: currentHHMM },
    })

	if (!exportFile) {
		return;
	}

	const filename = exportFile.filePath.split("/").pop();

	(channel as TextChannel).send({
		content: `Export job: \`${
			exportFile.name
		}\`\nTimestamp: \`${now.toISOString()}\``,
		files: [
			{
				attachment: exportFile.filePath,
				name: filename,
			},
		],
	});
}
