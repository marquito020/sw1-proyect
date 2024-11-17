import { hash, compare } from "bcrypt";

const encrypt = async (password) => {
  const passwordHash = await hash(password, 8);
  return passwordHash;
};

const verify = async (password, passwordHash) => {
  const isCorret = await compare(password, passwordHash);
  return isCorret;
};

export { encrypt, verify };
