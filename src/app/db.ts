import { PrismaClient } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(name: string, email: string, password: string, ) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await prisma.user.create({
    data: { name, email, password: hash|| null },
  });
}
