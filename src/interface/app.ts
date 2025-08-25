import dotenv from "dotenv";
dotenv.config();
import router from "./routes.ts";
import fetch from "node-fetch";
import express from "express";
import path from "path";
// Utilitaire pour récupérer des données JSON depuis une API
export async function fetchData(endpoint: string): Promise<any> {
  const baseUrl = process.env.URL_BD || "";
  const response = await fetch(`${baseUrl}${endpoint}`);
  if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
  return response.json();
}


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
