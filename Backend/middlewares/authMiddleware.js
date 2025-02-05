import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // Check for token in both cookie and Authorization header
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default verifyToken;
