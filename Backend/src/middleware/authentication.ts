import jwt from "jsonwebtoken";
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from 'Authorization' header

  if (!token) return res.status(403).send("Access denied");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next(); // Continue to the next middleware or route handler
  });
};

export default authenticateToken;
