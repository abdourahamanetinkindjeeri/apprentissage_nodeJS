# README

## Quelle différence avec envoyer du JSON ?

Quand on envoie du JSON, on transmet des données brutes (texte structuré) que le JavaScript du navigateur va devoir lire et afficher. C’est parfait pour les APIs ou les applis modernes (SPA) où le front gère tout.

Avec EJS, le serveur fabrique directement du HTML prêt à afficher dans le navigateur. C’est plus simple pour les sites classiques où on veut juste afficher des pages sans trop de logique côté client.

**En résumé :**

- JSON : pour échanger des données, surtout avec des applis JavaScript côté client.
- EJS : pour générer des pages HTML côté serveur, prêtes à l’emploi.

## Commandes utiles

Tout est déjà prêt dans le `package.json` :

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "db": "json-server --watch data/db.json --port 8888",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

---

## Explication des middlewares d’erreur

### Middleware 404

Ce middleware s’active quand aucune route ne correspond à la requête. Il affiche la page 404 animée (`404.ejs`). Cela permet d’indiquer à l’utilisateur que la page demandée n’existe pas, de façon élégante.

### Middleware 500

Ce middleware intercepte toutes les erreurs qui surviennent dans les routes ou dans d’autres middlewares. Si une erreur est « throw » ou passée à `next(err)`, ce middleware affiche la page 500 animée (`500.ejs`). Cela évite d’afficher des messages d’erreur bruts et améliore l’expérience utilisateur.

## Challenge 🎯

Pour tester le middleware 500, on a ajouté une route `/error-test` qui provoque une erreur volontairement :

```js
app.get("/error-test", (req, res) => {
  throw new Error("Erreur provoquée volontairement !");
});
```

Quand on visite cette URL, l’erreur est captée automatiquement par le middleware 500, qui affiche la page d’erreur animée. On peut donc vérifier que la gestion des erreurs fonctionne bien.

- `npm start` : lance le serveur principal (Express + EJS)
- `npm run dev` : lance le serveur avec rechargement automatique (nodemon)
- `npm run db` : lance un faux serveur API REST sur le fichier `db.json` (port 8888)
- `npm test` : (placeholder)

Avant de démarrer, on installe les dépendances :

```bash
npm install
```

Ensuite, on démarre ce que l’on veut :

- Serveur principal : `npm start`
- Mode dev : `npm run dev`
- API fake (db.json) : `npm run db`

```

```
