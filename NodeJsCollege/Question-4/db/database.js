var mongoose = require('mongoose');

class database {
  constructor() {
    this._connect();
  }
  async _connect() {
    try {
      await mongoose.connect(
        `mongo_url`
      );
      console.log(`database connection successfull`);
    } catch (error) {
      console.error('Database connection error: ' + error);
    }
  }
}

module.exports = new database();
