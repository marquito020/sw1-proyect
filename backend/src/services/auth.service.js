import { PrismaClient } from "@prisma/client";

import { encrypt, verify } from "../utils/bcrypt.utils.js";
import { generateToken } from "../utils/jwt.utils.js";

const prisma = new PrismaClient();

const register = async ({ name, email, password }) => {
  const existUser = await prisma.user.findUnique({ where: { email } });
  if (existUser) return null;

  const passwordHash = await encrypt(password);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
  });

  return newUser;
};

const login = async ({ email, password }) => {
  const userFound = await prisma.user.findUnique({ where: { email } });
  if (!userFound) return null;

  const passwordHash = userFound.password;
  const isCorrect = await verify(password, passwordHash);
  if (!isCorrect) return null;

  const token = generateToken(userFound);

  const data = {
    id: userFound.id,
    name: userFound.name,
    email: userFound.email,
    token,
    rol:userFound.rol
  };
  return data;
};

export default { register, login };
