import { Client } from 'discord.js';
import { IntentOptions } from './config/IntentOption';
import  AuthValidator from './utils/AuthValidator';
import  DatabaseConnector  from './utils/DatabaseConnector';

export default class DeeDeeBot {
  private mongoUrl: string = undefined;
  private botToken: string = undefined;
  private requireDatabase: boolean = false;

  private authValidation = new AuthValidator();
  private databaseConnection = new DatabaseConnector();

  public constructor(botToken: string, requireDatabase?: boolean, mongoUrl?: string) {
    if(requireDatabase != undefined) {
      this.requireDatabase = requireDatabase;
    }

    try {
      this.run();
    } catch (error) {
      throw new Error(`${this.constructor.name}: Failed to run the bot.`)
    }
  }

  public async run() {
    if( !(this.authValidation.validateToken) ) {
      throw new Error(`${this.constructor.name}: Failed to validate bot token.`);
    }
    console.log(`${this.constructor.name}: Bot token validated`);

    if( this.requireDatabase ) {
      /** Validate MongoDB if this bot required database */
      if( !(this.authValidation.validateMongo) ) {
        throw new Error(`${this.constructor.name}: Failed to validate MongoDB url.`)
      }
      console.log(`${this.constructor.name}: MongoDB url validated.`);

      /** Connect to Database */
      try {
        await this.databaseConnection.connectDatabase();
      } catch (error) {
        throw new Error(`${this.constructor.name}: Failed to establish a connection to MongoDB.`);
      }
      console.log(`${this.constructor.name}: MongoDB connected.`);
    }
    
    /** Bot Login */
    try {
      const bot = new Client({ intents: IntentOptions });
      await bot.login(process.env.BOT_TOKEN);
    } catch (error) {
      throw new Error(`${this.constructor.name}: Bot failed to log in.`);
    }
    console.log(`${this.constructor.name}: Bot logged in. Bot is running.`)
  }
}