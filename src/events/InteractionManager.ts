import { Interaction } from 'discord.js';
import { InteractionState } from './InteractionState';
import { Command } from './commands/Command';
import { commandList } from './commands/CommandList';

export default class InteractionManager {
  private interactionEvent: Interaction = undefined;
  private interactionState: InteractionState = undefined;

  public async onInteraction(interaction: Interaction) {
    if (interaction.isCommand()) {
      console.log(`${this.constructor.name}: Command Interaction Detected.`);
      this.setInteraction(interaction);
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
    } else {
      console.log(`${this.constructor.name}: Unknown Interaction Detected.`);
    }
  }

  public getInteraction(): Interaction {
    return this.interactionEvent;
  }

  public setInteraction(interaction: Interaction): void {
    this.interactionEvent = interaction;
  }

  public getInteractionState(): InteractionState {
    return this.interactionState;
  }

  public setInteractionState(interactionState: InteractionState): void {
    this.interactionState = interactionState;
  }
}
