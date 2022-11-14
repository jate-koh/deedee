import { Interaction } from 'discord.js';
import { InteractionState } from './InteractionState';
import { Command } from './commands/Command';
import { commandList } from './commands/CommandList';

export default class InteractionManager {
  private interactionEvent: Interaction;
  private interactionState: InteractionState = undefined;

  public constructor(interaction: Interaction) {
    this.interactionEvent = interaction;
    this.checkTypeInteraction(interaction);
  }

  public async checkTypeInteraction(interaction: Interaction) {
    if (interaction.isCommand()) {
      console.log(`${this.constructor.name}: Command Interaction Detected.`);
      this.setInteractionState(InteractionState.COMMAND);

      for (const Command of commandList) {
        if (interaction.command.name == Command.data.name) {
          try {
            await Command.run(interaction);
          } catch (error) {
            console.error(
              `${this.constructor.name}: Failed to execute command: '${interaction.command.name}'`
            );
          }
          break;
        }
      }
    }
  }

  public getInteraction(): Interaction {
    return this.interactionEvent;
  }

  public getInteractionState(): InteractionState {
    return this.interactionState;
  }

  public setInteractionState(interactionState: InteractionState): void {
    this.interactionState = interactionState;
  }
}
