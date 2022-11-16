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

  public run = async (interaction: CommandInteraction) => {
    console.log(`${this.constructor.name}: Running a test command....`);

    // interaction.deferReply();
    // const { user } = interaction;

    // const TestEmbed = new EmbedBuilder();
    // TestEmbed.setTitle('Test Command Invoked :+1:');
    // TestEmbed.setDescription('This bot working perfectly... :white_check_mark:');
    // TestEmbed.setAuthor({
    //   name: user.tag,
    //   iconURL: user.displayAvatarURL(),
    // });

    //await interaction.editReply({ embeds: [TestEmbed] });

    await interaction.reply({content: 'เล่น Phasmo กันเปล่า?'});
  }
}
