const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function createAccessToken(userId) {
  // Access Token mit dem Inhalt der User Id erstellen
  const accessToken = jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: '1h' });
  return accessToken;
}

function decodeAccessToken(accessToken) {
  // Den Inhalt des Access tokens dekodieren
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    // Token ist ungültig oder abgelaufen
    return null;
  }
}

module.exports = { createAccessToken, decodeAccessToken };
