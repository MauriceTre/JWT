const winston = require('winston');
require('dotenv').config(); // Lade Umgebungsvariablen aus .env-Datei
const jwt = require('jsonwebtoken');

// Konfiguration des Winston-Loggers
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info', // Setze das Log-Level auf "info", wenn LOG_LEVEL nicht festgelegt ist
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
    ],
});

const { JWT_SECRET } = process.env;

// Funktion zur Erstellung des Access Tokens
function createAccessToken(userId) {
    // Protokolliere eine Debug-Nachricht
    logger.debug(`Creating access token for user ${userId}`);

    // Access Token mit dem Inhalt der User Id erstellen
    const accessToken = jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: '1h' });

    // Protokolliere eine Info-Nachricht
    logger.info(`Access token created for user ${userId}`);

    return accessToken;
}

// Funktion zum Dekodieren des Access Tokens
function decodeAccessToken(accessToken) {
    // Protokolliere eine Debug-Nachricht
    logger.debug(`Decoding access token`);

    try {
        // Den Inhalt des Access Tokens dekodieren
        const decoded = jwt.verify(accessToken, JWT_SECRET);

        // Protokolliere eine Info-Nachricht
        logger.info(`Access token decoded`);

        return decoded.userId;
    } catch (err) {
        // Token ist ungültig oder abgelaufen
        // Protokolliere eine Fehler-Nachricht
        logger.error(`Error decoding access token: ${err.message}`);

        return null;
    }
}

module.exports = { createAccessToken, decodeAccessToken };

