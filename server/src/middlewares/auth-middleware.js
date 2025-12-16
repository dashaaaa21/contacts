const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  const bearerPrefix = 'Bearer ';
  const hasBearer = authHeader.startsWith(bearerPrefix);

  const token = hasBearer
    ? authHeader.slice(bearerPrefix.length)
    : null;

  const missingToken = !token;

  if (missingToken) {
    return res
      .status(401)
      .json({ message: 'Unauthorized' });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedData.userId;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;

