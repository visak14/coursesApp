const jwt = require('jsonwebtoken');
const SECRET ='SECr3t'; 

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        console.error('Token verification failed:', err);  
        return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};

module.exports = {
  authenticateJwt,
  SECRET
};
