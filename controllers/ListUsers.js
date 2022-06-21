const connection = require("express");

class ListUsersController {
  async handle(req, res) {
    try {
      return new Promise(function (resolve, reject) {
        connection.query(
          "SELECT Name FROM User",
          function (err, rows) {
            if (rows === undefined) {
              reject(new Error("Error rows is undefined"));
            } else {
              resolve(rows);
            }
          }
        )
      })
    } catch (err) {
      return res.json({
        error: err.message
      });
    }
  }
}

module.exports = {
  ListUsersController
};