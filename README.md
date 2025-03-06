# Express App avec Docker Swarm et Gestion des Secrets

## 📋 Description
Application Node.js/Express déployée avec Docker Swarm, utilisant une base de données MySQL et une gestion sécurisée des secrets. L'application fournit une API REST simple avec vérification de la connexion à la base de données.

## 🚀 Fonctionnalités
- Architecture microservices avec Docker Swarm
- Gestion sécurisée des secrets Docker
- Base de données MySQL avec persistance des données
- Réplication automatique des services
- Vérification de l'état de la base de données
- Logs détaillés pour le débogage

## 🔧 Prérequis
- [Node.js](https://nodejs.org/) (v14 ou supérieur)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

## 📦 Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/mourad1223/express-app-sample.git
cd express-app-sample
```

### 2. Configuration des secrets
Créez un dossier `secrets` et les fichiers de secrets :
```bash
mkdir -p secrets
echo "db" > secrets/db_host.txt
echo "root" > secrets/db_user.txt
echo "password" > secrets/db_password.txt
echo "mydatabase" > secrets/db_name.txt

docker secret create db_host db_host.txt
docker secret create db_user db_user.txt
docker secret create db_password db_password.txt
docker secret create db_name db_name.txt
```

### 3. Initialiser Docker Swarm
```bash
docker swarm init
```

### 4. Déployer l'application
```bash
docker stack deploy -c docker-compose.yml my_app_stack
```

## 🌐 Utilisation

### Endpoints disponibles
- **GET /** : Page d'accueil
  ```
  http://localhost:3000/
  ```
- **GET /check-db** : Vérification de la connexion à la base de données
  ```
  http://localhost:3000/check-db
  ```

### Vérifier l'état des services
```bash
docker service ls
```

### Consulter les logs
```bash
docker service logs my_app_stack_web
docker service logs my_app_stack_db
```

## 🏗️ Architecture

### Structure du projet
```
express-app-sample/
├── app.js              # Application Express
├── docker-compose.yml  # Configuration Docker
├── Dockerfile         # Configuration de l'image
├── secrets/          # Dossier des secrets Docker
│   ├── db_host.txt
│   ├── db_user.txt
│   ├── db_password.txt
│   └── db_name.txt
└── README.md         # Documentation
```

### Services Docker
- **Web** : Application Express (2 réplicas)
- **DB** : Base de données MySQL

## 🔐 Sécurité
- Utilisation des secrets Docker pour les informations sensibles
- Variables d'environnement pour la configuration
- Isolation des services via Docker networks
- Pas de mot de passe en clair dans le code

## 🛠️ Développement

### Installation des dépendances de développement
```bash
npm install
```


## 📝 Maintenance

### Mise à jour des services
```bash
docker stack deploy -c docker-compose.yml my_app_stack
```

### Arrêt des services
```bash
docker stack rm my_app_stack
```

## 🤝 Contribution
Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteur
- Mourad JAADAR (mjaadar1@myges.fr)

## 🙏 Remerciements
- L'équipe Docker pour leurs excellents outils
- La communauté Express.js
- MySQL pour leur base de données robuste

Tunnel ngrok

Démarrez un tunnel ngrok pour rendre l'application accessible publiquement :

ngrok tcp 22 
