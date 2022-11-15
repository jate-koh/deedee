import { Client } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commandList } from './commands/CommandList';

export default class Initializer {
  public async onReady(bot: Client, botToken: string, guildId: string) {
    const rest = new REST({ version: '9' }).setToken(botToken);

    const commandData = commandList.map((command) => command.data.toJSON());

    await rest.put(Routes.applicationGuildCommands(bot.user?.id, guildId), {
      body: commandData,
    });
  }
}
