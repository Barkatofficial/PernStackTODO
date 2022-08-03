const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({
  path: './config/config.env',
});

function jwtGenerator(u_id) {
  const payload = {
    user: {
      id: u_id
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  // return jwt.sign(payload, 'hdgsretdgehetdgetegdldkhfjfnhbhdffg', { expiresIn: "1h" });
}

module.exports = jwtGenerator;