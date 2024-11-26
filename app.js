// Import des dépendances nécessaires
const express = require('express');                // Framework web Express
const mysql = require('mysql2/promise');           // Client MySQL avec support des Promises
const fs = require('fs').promises;
require('dotenv').config();                       // Chargement des variables d'environnement

// Création de l'application Express
const app = express();

// Fonction pour lire le contenu d'un fichier secret
async function readSecret(path) {
    try {
        if (!path) return null;
        const secret = await fs.readFile(path, 'utf8');
        return secret.trim();
    } catch (err) {
        console.error(`Erreur lors de la lecture du secret ${path}:`, err);
        return null;
    }
}

// Fonction pour vérifier la connexion à la base de données
async function checkDbConnection() {
    try {
        // Configuration de la base de données
        const config = {
            host: 'db',  // Nom du service dans docker-compose
            user: 'root',
            password: 'password',
            database: 'mydatabase'
        };

        // Si les secrets sont disponibles, les utiliser
        if (process.env.DB_HOST) {
            const dbHost = await readSecret(process.env.DB_HOST);
            if (dbHost) config.host = dbHost;
        }
        if (process.env.DB_USER) {
            const dbUser = await readSecret(process.env.DB_USER);
            if (dbUser) config.user = dbUser;
        }
        if (process.env.DB_PASSWORD) {
            const dbPassword = await readSecret(process.env.DB_PASSWORD);
            if (dbPassword) config.password = dbPassword;
        }
        if (process.env.DB_NAME) {
            const dbName = await readSecret(process.env.DB_NAME);
            if (dbName) config.database = dbName;
        }

        console.log('Tentative de connexion avec les paramètres :', {
            host: config.host,
            user: config.user,
            database: config.database
        });

        const connection = await mysql.createConnection(config);
        await connection.end();
        return true;
    } catch (err) {
        console.error('Échec de la connexion à la base de données:', err.message);
        return false;
    }
}

// Route racine : affiche un message simple
app.get('/', async (req, res) => {
    res.send("Hello, I'm an Express app");
});

// Route pour vérifier l'état de la connexion à la base de données
app.get('/check-db', async (req, res) => {
    const isConnected = await checkDbConnection();
    if (isConnected) {
        res.send('Database Connection Status: Connected');
    } else {
        res.send('Database Connection Status: Disconnected');
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;            // Port depuis les variables d'environnement ou 3000 par défaut
app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

