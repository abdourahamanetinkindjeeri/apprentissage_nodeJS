import express from "express";
import basicRoutes from "./routes/basic.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.get("/", (req, res) => {
  res.render("index", { message: process.env.MESSAGE || "Bienvenue !" });
});

app.use("/", basicRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Serveur démarré sur http://localhost:${PORT} [${
      process.env.NODE_ENV || "development"
    }]`
  );
});
