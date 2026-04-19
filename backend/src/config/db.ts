import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../../generated/prisma/client";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

type Client = InstanceType<typeof PrismaClient>;

let instance: Client | undefined;

function getDb(): Client {
  if (!instance) {
    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
    instance = new PrismaClient({ adapter });
  }
  return instance;
}

const prisma = new Proxy({} as Client, {
  get(_, prop) {
    const db = getDb();
    const val = (db as any)[prop];
    return typeof val === "function" ? val.bind(db) : val;
  },
});

export default prisma;
