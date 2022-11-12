require('dotenv').config();

export class authValidator {

    private token: string = process.env.BOT_TOKEN || undefined;
    private mongoUrl: string = process.env.MONGO_URL || undefined;

    public constructor() {
        this.token = process.env.BOT_TOKEN;
        this.mongoUrl = process.env.MONGO_URL;
    }
    
    public validateToken(): boolean {
        if(!this.token) {
            console.warn(`${this.constructor.name}: Missing discord bot token!`);
            return false;
        }
        else {
            return true;
        }
    }

    public validateMongo(): boolean {
        if(!this.mongoUrl) {
            console.warn(`${this.constructor.name}: Missing MongoDB URL!`);
            return false;
        }
        else {
            return true;
        }
    }

}