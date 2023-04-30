const bcrypt = require('bcryptjs');

async function saltPassword(password) {
  return await bcrypt.hash(password, await bcrypt.genSalt(1));
}

module.exports = saltPassword;
