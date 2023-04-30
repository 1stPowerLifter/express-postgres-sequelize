const jwt = require('jsonwebtoken');

const { AT_SECRET_KEY = '', AT_EXPIRES_IN = '1m', RT_SECRET_KEY = '', RT_EXPIRES_IN = '30m' } = process.env;

class AuthTokenHelper {
  createAt = (payload) => jwt.sign(payload, AT_SECRET_KEY, { expiresIn: AT_EXPIRES_IN });

  verifyAt(token) {
    try {
      const { id } = jwt.verify(token, AT_SECRET_KEY);
      return id;
    } catch (error) {
      if (error.message === 'invalid signature') error.status = 401;
      throw error;
    }
  }

  createRt = (payload) => jwt.sign(payload, RT_SECRET_KEY, { expiresIn: RT_EXPIRES_IN });

  verifyRt(token) {
    try {
      return jwt.verify(token, RT_SECRET_KEY);
    } catch (error) {
      if (error.message === 'invalid signature') error.status = 401;
      throw error;
    }
  }

  getTokens(payload) {
    return {
      accessToken: this.createAt(payload),
      refreshToken: this.createRt(payload),
    };
  }

  decode = (id_token) => jwt.decode(id_token);
}

module.exports = new AuthTokenHelper();
