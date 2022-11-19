import { Client } from 'discord.js';
import { IntentOptions } from './config/IntentOption';
import Initializer from './events/Initializer';
import InteractionManager from './events/InteractionManager';
import AuthManager from './utils/AuthManager';
import DatabaseConnector from './utils/DatabaseConnector';

export default class DeeDeeBot {
  private requireDatabase: boolean = false;

  private authManager = new AuthManager();
  private databaseConnection = new DatabaseConnector();
  private interactionManager = new InteractionManager();
  private initalization = new Initializer();

  public constructor(
    botToken: string,
    guildId: string,
    requireDatabase?: boolean,
    mongoUrl?: string
  ) {

    this.authManager.setBotToken(botToken);
    this.authManager.setGuildId(guildId);

    if (requireDatabase != undefined) {
      this.requireDatabase = requireDatabase;
      this.authManager.setMongoUrl(mongoUrl);
    }

    try {
      this.auth();
      this.run();
    } catch (error) {
      throw new Error(`${this.constructor.name}: Failed to run the bot.`);
    }
    console.log(`${this.constructor.name}: Bot launch completed.`)
  }

  public async auth() {
    if(!this.authManager.doAuth(this.requireDatabase)) {
      throw new Error(`${this.constructor.name}: Authentication failed`);
    }
  }

  public async run() {

    if (this.requireDatabase) {
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
      await bot.login(this.authManager.getBotToken());
      console.log(`${this.constructor.name}: Bot logged in.`);
    } catch (error) {
      throw new Error(`${this.constructor.name}: Bot failed to log in.`);
    }

    bot.on('ready', async () => {
      try {
        await this.initalization.onReady(
          bot, 
          this.authManager.getBotToken(), 
          this.authManager.getGuildId());
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
