const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const AccessTokens = require("../services/auth/AccessToken");

function authMiddleWare(req, res, next) {
  // Middleware soll Access Token auslesen und die dekodierten Informationen an den jeweiligen Endpunkt weitergeben
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).send("No Token provided!");
  }
  try {
    const decodedAccessToken = AccessTokens.decodeAccessToken(token);
    req.user = decodedAccessToken;
  } catch (e) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send("Something is wrong with your token");
  }

  return next();
}

module.exports = authMiddleWare;
