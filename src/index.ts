import { Client } from "discord.js"
import { IntentOptions } from "@/config/IntentOption";

( async () => {
    const bot = new Client({intents: IntentOptions});

    await bot.login(process.env.BOT_TOKEN)
}) ();