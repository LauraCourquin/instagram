const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "users";

  insert(user) {
    return this.connection.query(
      `insert into ${UserManager.table} (lastname, firstname, pseudo, email, password, birthday) values (?,?,?,?,?,?)`,
      [
        user.lastname,
        user.firstname,
        user.pseudo,
        user.email,
        user.password,
        user.birthday,
      ]
    );
  }

  findOneByMail(mail) {
    return this.connection.query(
      `select * from ${UserManager.table} where email=?`,
      [mail]
    );
  }
}

module.exports = UserManager;
