import fs from "fs";
import path from "path";

export type Role = "ADMIN" | "DOCTOR";

type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
};

type DBShape = {
  users: User[];
};

const DB_FILE = path.resolve(process.cwd(), "dev.db.json");

function readDB(): DBShape {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw) as DBShape;
  } catch {
    const initial: DBShape = { users: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
}

function writeDB(db: DBShape) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export function getUserByEmail(email: string): User | undefined {
  const db = readDB();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser({ name, email, passwordHash, role }: { name: string; email: string; passwordHash: string; role: Role }): User {
  const db = readDB();
  if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("User already exists");
  }
  const id = `usr_${Math.random().toString(36).slice(2, 10)}`;
  const createdAt = new Date().toISOString();
  const user: User = { id, email, name, passwordHash, role, createdAt };
  db.users.push(user);
  writeDB(db);
  return user;
}

