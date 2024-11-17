import AuthService from "../services/auth.service.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await AuthService.register({ name, email, password });

    if (!newUser)
      return res.status(400).json({ message: "El email ya esta en uso" });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log("Error Server: ", error);
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAndToken = await AuthService.login({ email, password });

    if (!userAndToken) {
      return res
        .status(400)
        .json({ message: "El email o password son incorrectos" });
    }

    return res.status(200).json(userAndToken);
  } catch (error) {
    console.log("Error Server: ", error);
    res.status(500).json(error);
  }
};

const isAlive = async (req, res) => {
  return res.status(200).json({ message: "is Ok" });
};




export default { register, login, isAlive };
