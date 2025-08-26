# Partie 11 – Organisation du projet Node.js

## Structure

- Les routes `/about` et `/contact` sont placées dans `routes/basic.js`.
- Les vues sont dans le dossier `views/`.
- Les variables d'environnement sont gérées via `.env`.

## Pourquoi organiser ainsi dans un grand projet ?

Organiser le code par dossiers (routes, vues, etc.) permet :

- Une meilleure lisibilité et évolutivité du projet.
- Une maintenance facilitée.
- Un découpage logique par fonctionnalité.
- Une collaboration plus efficace entre développeurs.

## Variables d'environnement

- `.env` contient les variables sensibles ou spécifiques à l'environnement (ex : PORT, MESSAGE, NODE_ENV).
- `.env.example` sert de modèle à partager sans les valeurs sensibles.

## Lancer le projet

```bash
npm install
npm start # ou node server.js
```

## Utilisation de NODE_ENV

La variable `NODE_ENV` permet de distinguer les environnements (développement, production, test) et d'adapter le comportement de l'application (logs, sécurité, etc.).
