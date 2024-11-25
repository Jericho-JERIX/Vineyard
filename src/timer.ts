import { Client } from "discord.js";
import { sendFileOnScheduleToTextChannel } from "./apis/SendFileOnScheduleToTextChannel";

const jobs: Function[] = [
    sendFileOnScheduleToTextChannel
];

function executeAllJobs(client:Client) {    
    for (const job of jobs) {
        try {
            job(client);
        } catch (error) {
            console.error(`❌ Job failed: ${error}`);
        }
    }
}

export function triggerMinutelyUpdate(client: Client) {
	const today = new Date();
	const diffToNextMinute = 60000 - (today.getTime() % 60000);

	console.log(
		`✅ Minutely update activated (will be triggered in ${
			diffToNextMinute / 1000
		}s)`
	);
	setTimeout( () => {
		executeAllJobs(client)
		setInterval( () => {
			executeAllJobs(client)
		}, 60*1000);
	}, diffToNextMinute);
}