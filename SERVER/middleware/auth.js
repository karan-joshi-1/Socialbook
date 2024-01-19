import jwt from "jsonwebtoken";

// Verify token
export const verifyToken = async (req, res, next) => {
  // Get token from header
  let token = req.header("Authorization");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }
  
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }
  
  // Verify token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Add user object (with user id) from payload to request object
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
