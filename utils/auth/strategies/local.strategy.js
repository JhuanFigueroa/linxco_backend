const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const AuthService = require('./../../../services/auth.service');
const service = new AuthService();

const LocalStrategy = new Strategy({
    usernameField: 'clave',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const user = await service.findByUser(username);
      if (!user) {
        console.log('no user')
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
