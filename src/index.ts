import { Client } from 'discord.js';
import { IntentOptions } from '@/config/IntentOption';
import { authValidator } from './utils/authValidator';
import { databaseConnector } from './utils/databaseConnector';

const authValidation = new authValidator();
const databaseConnection = new databaseConnector();

(async () => {
  if( !(authValidation.validateToken || authValidation.validateMongo) ) {
    console.error(`Index: Both Token and MongoDB URL is not set!`);
    return;
  }

  if( !databaseConnection.connectDatabase ) {
    console.error(`Index: Failed to connect to MongoDB!`)
  }
  
  try {
    const bot = new Client({ intents: IntentOptions });
    await bot.login(process.env.BOT_TOKEN);
  } catch (error) {
    throw new Error(`Index: Bot failed to login!`);
  }

})();
