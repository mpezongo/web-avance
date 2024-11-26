const db = require('../models/db')
const Session = db.session

const authenticate = async (token) => {

  if (!token) {
    return false;
  }

  try {
    const session = await Session.findOne({ where: { token } });

    if (!session) {
      return false;
    }

    if (new Date() > session.expirationDate) {
      return "isOutDated";
    }
    return session;

  } catch (error) {
    console.error('Authentication error:', error);
  }
};

module.exports = authenticate;
