// ref: 37aa88161f
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: "Access denied: session credential missing or expired"
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey_37aa88161f');
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({
      error: "Access denied: session credential missing or expired"
    });
  }
};
