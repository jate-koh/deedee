import { Client } from 'discord.js';
import { IntentOptions } from './config/IntentOption';
import Initializer from './events/Initializer';
import InteractionManager from './events/InteractionManager';
import AuthValidator from './utils/AuthValidator';
import DatabaseConnector from './utils/DatabaseConnector';

export default class DeeDeeBot {
  private mongoUrl: string = undefined;
  private botToken: string = undefined;
  private guildId: string = undefined;
  private requireDatabase: boolean = false;

  private authValidation = new AuthValidator();
  private databaseConnection = new DatabaseConnector();
  private interactionManager = new InteractionManager();
  private initalization = new Initializer();

  public constructor(
    botToken: string,
    guildId: string,
    requireDatabase?: boolean,
    mongoUrl?: string
  ) {
    this.botToken = botToken;
    this.mongoUrl = mongoUrl;
    this.guildId = guildId;
    if (requireDatabase != undefined) {
      this.requireDatabase = requireDatabase;
    }

    try {
      this.run();
    } catch (error) {
      throw new Error(`${this.constructor.name}: Failed to run the bot.`);
    }
  }

  public async run() {
    if (!this.authValidation.validateToken) {
      throw new Error(
        `${this.constructor.name}: Failed to validate bot token.`
      );
    }
    console.log(`${this.constructor.name}: Bot token validated.`);

    if (!this.authValidation.validateGuildId) {
      throw new Error(
        `${this.constructor.name}: Failed to validate server ID.`
      );
    }
    console.log(`${this.constructor.name}: Server ID validated.`);

    if (this.requireDatabase) {
      /** Validate MongoDB if this bot required database */
      if (!this.authValidation.validateMongo) {
        throw new Error(
          `${this.constructor.name}: Failed to validate MongoDB url.`
        );
      }
      console.log(`${this.constructor.name}: MongoDB url validated.`);

      /** Connect to Database */
      try {
        await this.databaseConnection.connectDatabase();
      } catch (error) {
        throw new Error(
          `${this.constructor.name}: Failed to establish a connection to MongoDB.`
        );
      }
      console.log(`${this.constructor.name}: MongoDB connected.`);
    }

    const bot = new Client({ intents: IntentOptions });

    /** Bot Login */
    try {
      await bot.login(this.botToken);
      console.log(`${this.constructor.name}: Bot logged in.`);
    } catch (error) {
      throw new Error(`${this.constructor.name}: Bot failed to log in.`);
    }

    bot.on('ready', async () => {
      try {
        await this.initalization.onReady(bot, this.botToken, this.guildId);
      } catch (error) {
        throw new Error(
          `${this.constructor.name}: Failed to initialize settings`
        );
      }
      console.log(
        `${this.constructor.name}: Bot initialized. Bot is ready.`
      );
    });

    bot.on('interactionCreate', async (interaction) => {
      try {
        await this.interactionManager.onInteraction(interaction);
      } catch (error) {
        console.error(
          `${this.constructor.name}: Error occured on Interaction Manager`
        );
      }
    });
  }
}
