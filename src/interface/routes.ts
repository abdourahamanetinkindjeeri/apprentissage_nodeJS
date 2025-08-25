import { Router } from "express";
import type { Request, Response } from "express";
import { FileUserRepository } from "../infrastructure/fileUserRepository.ts";
import superheroes from "superheroes";

const router = Router();
const userRepo = new FileUserRepository();

// Exemple de route d'accueil
router.get("/", (req: Request, res: Response) => {
  res.render("dashboard");
});

router.get("/dashboard", (req: Request, res: Response) => {
  res.render("dashboard");
});
// Liste des utilisateurs
router.get("/users", async (req: Request, res: Response) => {
  const users = await userRepo.getAll();
  res.render("users", { users });
});

// Formulaire ajouter utilisateur
router.get("/add-user", (req: Request, res: Response) => {
  res.render("add-user");
});

// POST ajouter utilisateur
router.post("/add-user", async (req: Request, res: Response) => {
  const { name, github } = req.body;
  await userRepo.add({ name, github });
  res.redirect("/users");
});

// Recherche utilisateurs
router.get("/users/search", async (req: Request, res: Response) => {
  const q = (req.query.q as string) || "";
  const users = await userRepo.searchByName(q);
  res.render("users", { users });
});

// Détails utilisateur
router.get("/users/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await userRepo.getById(id);
  if (!user) {
    return res
      .status(404)
      .render("error", { message: "Utilisateur non trouvé" });
  }
  const qrCodePath = `/qr-code/user-${user.id}.png`;
  res.render("user-details", { user, qrCodePath });
});

// Superhéros aléatoire
router.get("/random", (req: Request, res: Response) => {
  const hero = superheroes.random();
  res.render("index", { hero });
});

// 404
router.use((req: Request, res: Response) => {
  res.status(404).render("error", { message: "Page non trouvée" });
});

// Erreurs serveur
router.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err);
  res.status(500).render("error", { message: "Erreur serveur" });
});

export default router;
