import 'server-only';
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

export async function getUserByEmailOrPhone(emailOrPhone: string){
  return await prisma.user.findFirst({
    where:{
      OR:[
        {email:emailOrPhone},
        {phoneNumber:emailOrPhone}

      ]
    }
  });
}


export async function createUserWithPhone(
  name: string,
  email: string|null,
  phoneNumber: string|null,
  password:string,
) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await prisma.user.create({
    data:{
      name,
      email: email||null,
      phoneNumber: phoneNumber||null,
      password: hash,
    },
  });
}
export async function createUser(name: string, email: string, phoneNumber: string|null, password: string, ) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await prisma.user.create({
    data: { name, email, phoneNumber, password: hash|| null },
  });
}


