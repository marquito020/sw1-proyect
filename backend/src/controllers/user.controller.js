import UserService from "../services/user.service.js";

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserService.getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error Server: ", error);
    return es.status(500).json(error);
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await UserService.addUser({ name, email, password });
    if (!newUser)
      return res.status(400).json({ message: "El email ya existe" });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUser(parseInt(id));
    if (!user) return res.status(400).json({ message: "El usuario no existe" });

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error Server: ", error);
    return es.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserService.updateUser(parseInt(id), req.body);

    if (!updatedUser)
      return res.status(400).json({ message: "El usuario no existe" });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error Server: ", error);
    return es.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserService.deleteUser(parseInt(id));

    if (!deletedUser)
      return res.status(400).json({ message: "El usuario no existe" });

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log("Error Server: ", error);
    return es.status(500).json(error);
  }
};

const paymentUser = async (req, res) => {
  //return res.status(200).json(req.body);
  try {
    const { id } = req.params;
    const updatedUser = await UserService.updateRol(parseInt(id), req.body);

    if (!updatedUser)
      return res.status(400).json({ message: "El usuario no existe" });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error Server: ", error);
    return es.status(500).json(error);
  }
};

export default { getAllUsers, addUser, getUser, updateUser, deleteUser,paymentUser };
