const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    // Returns the payload decoded if the signature is valid
    // and optional expiration, audience, or issuer are valid.
    // If not, it will throw the error.
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Todo: check if the user still exists in the database
    
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch {
    throw new UnauthenticatedError("Invalid token");
  }
};

module.exports = authenticationMiddleware;
