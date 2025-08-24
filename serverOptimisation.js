import dotenv from "dotenv";

import express from "express";
import { fetchJSON } from "./data/utils/fetchData.js";

// Charger les variables du fichier .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", "./views");

// Route utilisant EJS
app.get("/users", async (req, res) => {
  try {
    const users = await fetchJSON("users");
    res.render("users", { users, title: "Liste des utilisateurs" });
  } catch (error) {
    console.error("Erreur fetch:", error.message);
    res.status(500).send("Impossible de charger les utilisateurs");
  }
});

// Challenge : Route qui provoque une erreur
app.get("/error-test", (req, res) => {
  throw new Error("Erreur provoquée volontairement !");
});

// Middleware 500 animé
app.use((err, req, res, next) => {
  console.error("Erreur capturée:", err.stack);
  res.status(500).render("500");
});

// Middleware 404 animé
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Environnement: ${process.env.NODE_ENV}`);
});
