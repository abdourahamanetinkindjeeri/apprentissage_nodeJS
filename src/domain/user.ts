export type User = {
  id: number;
  name: string;
  github: string;
};

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | undefined>;
  searchByName(query: string): Promise<User[]>;
  add(user: Omit<User, "id">): Promise<User>;
}
