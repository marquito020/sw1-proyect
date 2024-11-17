import { PrismaClient } from "@prisma/client";

import { encrypt } from "../utils/bcrypt.utils.js";

const prisma = new PrismaClient();

const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

const addUser = async ({ name, email, password }) => {
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

const getUser = async (id) => {
  const userFound = await prisma.user.findUnique({ where: { id } });
  return userFound;
};

const updateUser = async (id, dataUser) => {
  const existUser = await prisma.user.findUnique({ where: { id } });
  if (!existUser) return null;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name: dataUser.name,
      email: dataUser.email,
      phone: dataUser.phone ? dataUser.phone : null,
      address: dataUser.address,
    },
  });

  return updatedUser;
};

const updateRol = async (id, dataUser) => {
  const existUser = await prisma.user.findUnique({ where: { id } });
  if (!existUser) return null;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      rol: dataUser.rol      
    },
  });

  return updatedUser;
};

const deleteUser = async (id) => {
  const existUser = await prisma.user.findUnique({ where: { id } });
  if (!existUser) return null;

  const deletedUser = await prisma.user.delete({ where: { id } });
  return deletedUser;
};

export default { getAllUsers, addUser, getUser, updateUser, deleteUser, updateRol};
