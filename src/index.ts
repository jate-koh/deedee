import dotenv from 'dotenv';
import DeeDeeBot from './DeeDeeBot';

dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const MONGO_URL = process.env.MONGO_URL || undefined;

new DeeDeeBot(BOT_TOKEN, GUILD_ID, false, MONGO_URL);
