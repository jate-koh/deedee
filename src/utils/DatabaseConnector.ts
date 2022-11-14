import { connect } from 'mongoose';

export default class DatabaseConnector {
  private mongoUrl: string = undefined;

  /**
   * Set official/permanent url that are used to establish connection to
   * your MongoDB
   * @param mongoUrl String: your MongoDB's url.
   */
  public setUrl(mongoUrl: string) {
    this.mongoUrl = mongoUrl;
  }

  /**
   * Function that is used to connect to your database; by default it will use your MongoDB url that you
   * previously set using setUrl().
   * However, it also allow override option, you can manually put MongoDB into parameter for it to override the
   * url that your previously set as permanent url using setUrl()
   * @param overrideUrl String (Optional):
   * @returns false if error occured when establishing connection.
   * @returns true if sucessfully connect to database.
   */
  public async connectDatabase(overrideUrl?: string): Promise<boolean> {
    try {
      if (overrideUrl != undefined) {
        await connect(overrideUrl);
      } else {
        await connect(this.mongoUrl);
      }
    } catch (error) {
      console.error(`
                ${this.constructor.name}: Failed to connect to database,
                ${error.message}
            `);
      return false;
    }
    return true;
  }
}