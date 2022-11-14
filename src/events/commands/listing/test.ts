import {
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import { Command } from '../Command';

export default class test implements Command {
  public data = new SlashCommandBuilder()
    .setName('Test Command')
    .setDescription('Test to see if bot is working or not');

  public async run(interaction: CommandInteraction): Promise<void> {}
}
