import jsonwebtoken from "jsonwebtoken";

const { sign, verify } = jsonwebtoken;

const JWT_SECRET = process.env.JWT_SECRET || "token. 1010101";

/**
 * @param {Object} User - User data
 * @param {int} User.id - user id
 * @param {string} User.email - user email
 */
const generateToken = ({ id, email }) => {
  const jwt = sign({ id, email }, JWT_SECRET, {
    expiresIn: "12h",
  });
  return jwt;
};


// const verifyToken = (jwt) => {
//   const isOk = verify(jwt, JWT_SECRET);
//   return isOk;
// };

export { generateToken };
