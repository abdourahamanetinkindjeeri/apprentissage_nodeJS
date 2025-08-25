# Mini-projet Node.js

Ce projet est une application web simple permettant de gérer des utilisateurs, avec génération de QR code et affichage d'un superhéros aléatoire.

## Fonctionnalités

- Liste, ajout, recherche et détails des utilisateurs
- Génération de QR code pour chaque utilisateur
- Affichage d'un superhéros aléatoire
- Design moderne sans framework CSS externe

## Prérequis

- Node.js >= 16
- npm

## Installation

1. Cloner le dépôt
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Copier le fichier `.env.example` en `.env` et adapter si besoin
4. Lancer le mock API (json-server) :
   ```bash
   npx json-server --watch db.json --port 3001
   ```
5. Lancer le serveur principal :
   ```bash
   npm start
   ```

## Variables d'environnement

Voir `.env.example` pour la configuration.

## Structure du projet

- `src/` : code source (routes, logique, repository...)
- `views/` : templates EJS
- `public/` : fichiers statiques (CSS, QR codes)
- `db.json` : base de données mockée pour json-server

## Auteur

- Votre nom ici
