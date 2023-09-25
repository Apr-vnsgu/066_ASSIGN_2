var mongoose = require('mongoose');

class database {
  constructor() {
    this._connect();
  }
  async _connect() {
    try {
      await mongoose.connect(
        `mongodb+srv://arya:arya1234@cluster0.5dbxggj.mongodb.net/UserQ4?retryWrites=true&w=majority`
      );
      console.log(`database connection successfull`);
    } catch (error) {
      console.error('Database connection error: ' + error);
    }
  }
}

module.exports = new database();
