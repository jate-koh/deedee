import { constants } from 'buffer';
import {
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  EmbedBuilder,
} from 'discord.js';
import { Command } from '../Command';

export default class test implements Command {
  public data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test to see if bot is working or not');

  public async run(interaction: CommandInteraction): Promise<void> {
    console.log(`${this.constructor.name}: DeeDeeBot run a test command....`);

    const { user } = interaction;

    const TestEmbed = new EmbedBuilder();
    TestEmbed.setTitle('Test Command Invoked :+1:');
    TestEmbed.setDescription('This bot workin perfectly... :white_check_mark:');
    TestEmbed.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });

    await interaction.channel.send({ embeds: [TestEmbed] });
  }
}
