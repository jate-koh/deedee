require('dotenv').config();
import { connect } from "mongoose";

export class databaseConnector {
    
    private mongoToken: string = process.env.MONGO_URL || undefined;

    public constructor() {
        this.mongoToken = process.env.MONGO_URL;
    }
    
    public async connectDatabase(): Promise<boolean> {
        try {
            await connect(this.mongoToken);
        } catch (error) {
            console.error(`
                ${this.constructor.name}: Failed to connect to database,
                ${error.message}
            `)
            return false;
        }
        return true;
    }

}