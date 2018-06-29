const path = require('path')

module.exports = {
  dialect: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'mydb.db')
  },
  useNullAsDefault: true
}
