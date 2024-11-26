# Express App with Docker Swarm

## Description
Ce projet est une application Node.js utilisant Express, déployée avec Docker Swarm et automatisée avec GitHub Actions. L'application vérifie la connexion à une base de données MySQL et fournit une interface web accessible via un tunnel ngrok.

## Prérequis
- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [ngrok](https://ngrok.com/)
- Un compte Docker Hub
- Un compte GitHub

## Installation

### 1. Cloner le dépôt
```sh
git clone https://github.com/moumou200/express-app-sample.git
cd express-app-sample

2. Installer les dépendances

npm install


3.Configurer Docker et Docker Swarm

docker swarm init

Créer des Docker secrets :
echo "db" > db_host.txt
echo "root" > db_user.txt
echo "password" > db_password.txt
echo "mydatabase" > db_name.txt

docker secret create db_host db_host.txt
docker secret create db_user db_user.txt
docker secret create db_password db_password.txt
docker secret create db_name db_name.txt

4.Déployer avec Docker stack :

docker stack deploy -c docker-compose.yml my_app_stack

5.Accéder à l'application

L'application sera accessible via le port 3000 :

http://localhost:3000


6.Vérifier la connexion à la base de données

Utilisez l'endpoint /check-db pour vérifier la connexion à la base de données :

http://localhost:3000/check-db



Tunnel ngrok

Démarrez un tunnel ngrok pour rendre l'application accessible publiquement :

ngrok tcp 22 
