const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

class AuthController {
  static signup = async (req, res) => {
    const users = req.body;

    users.password = bcrypt.hashSync(
      users.password,
      parseInt(process.env.CRYPT_ROUNDS, 10)
    );

    models.users
      .insert(users)
      .then(([result]) => {
        users.id = result.insertId;
        delete users.password;
        const token = jwt.sign(users, process.env.JWT_SECRET);
        res.status(201).send({ users, token });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static login = (req, res) => {
    const token = jwt.sign(req.user, process.env.JWT_SECRET);
    res.status(200).json({ users: req.user, token });
  };
}

module.exports = AuthController;
