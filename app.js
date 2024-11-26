// Import des dépendances nécessaires
const express = require('express');                // Framework web Express
const mysql = require('mysql2/promise');           // Client MySQL avec support des Promises
require('dotenv').config();                       // Chargement des variables d'environnement

// Création de l'application Express
const app = express();

// Fonction pour vérifier la connexion à la base de données
async function checkDbConnection() {
    // Récupération des paramètres de connexion depuis les variables d'environnement
    // avec des valeurs par défaut si non définies
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbUser = process.env.DB_USER || 'root';
    const dbPassword = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME || 'test';

    try {
        // Tentative de connexion à la base de données
        const connection = await mysql.createConnection({
            host: dbHost,
            user: dbUser,
            password: dbPassword,
            database: dbName,
        });
        // Fermeture propre de la connexion
        await connection.end();
        return true;
    } catch (err) {
        // En cas d'erreur, affichage dans la console
        console.error('Failed to connect to database:', err.message);
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

