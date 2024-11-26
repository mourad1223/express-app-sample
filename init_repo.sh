#!/bin/bash

# Variables à personnaliser
GITHUB_USER="dark-funk"  # Remplace par ton pseudo GitHub
REPO_NAME="express-app2"           # Nom du dépôt
DESCRIPTION="Premier commit - 26 novembre 2024"
VISIBILITY="public"           # Ou "public" selon ton choix
COMMIT_MESSAGE="Initial commit"
COMMIT_DATE="2024-11-26T16:00:00"

# 📌 1. Créer un repo GitHub depuis la ligne de commande
gh repo create $REPO_NAME --$VISIBILITY --description "$DESCRIPTION" --confirm

# 📌 2. Initialiser le dépôt localement
git init
git branch -M main  # ou "master" si nécessaire
git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git

# 📌 3. Ajouter tous les fichiers et faire un commit avec une date passée
git add .
GIT_AUTHOR_DATE="$COMMIT_DATE" GIT_COMMITTER_DATE="$COMMIT_DATE" git commit -m "$COMMIT_MESSAGE" --author="$GITHUB_USER <ton-email@example.com>"

# 📌 4. Vérifier le commit
git log --pretty=fuller -1

# 📌 5. Pousser vers GitHub
git push -u origin main

echo "✅ Dépôt '$REPO_NAME' créé et pushé avec succès !"
