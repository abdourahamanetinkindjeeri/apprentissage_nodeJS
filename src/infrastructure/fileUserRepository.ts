import type { User, UserRepository } from "../domain/user.js";
import { fetchData } from "../interface/app.ts";
import QRCode from "qrcode";
import path from "path";
import fs from "fs/promises";

export class FileUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    try {
      const users = await fetchData("/users");
      return users;
    } catch {
      return [];
    }
  }

  async getById(id: number): Promise<User | undefined> {
    const users = await this.getAll();
    return users.find((u) => u.id === id);
  }

  async searchByName(query: string): Promise<User[]> {
    const users = await this.getAll();
    return users.filter((u) =>
      u.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async add(user: Omit<User, "id">): Promise<User> {
    // 1. Récupérer tous les utilisateurs pour trouver le plus grand ID entier
    const users = await this.getAll();
    const maxId = users.reduce((max, u) => {
      const idNum = typeof u.id === "number" ? u.id : parseInt(u.id, 10);
      return !isNaN(idNum) && idNum > max ? idNum : max;
    }, 0);
    const newId = maxId + 1;
    const newUser = { ...user, id: newId };

    // 2. POST vers json-server
    const baseUrl = process.env.URL_BD || "";
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
    const savedUser = await response.json();

    // 3. Générer et sauvegarder le QR code dans public/qr-code
    const qrDir = path.join(process.cwd(), "public", "qr-code");
    try {
      await fs.mkdir(qrDir, { recursive: true });
      const qrPath = path.join(qrDir, `user-${savedUser.id}.png`);
      await QRCode.toFile(qrPath, savedUser.github || "https://github.com");
    } catch (err) {
      console.error("Erreur lors de la génération du QR code:", err);
    }

    return savedUser;
  }
}
