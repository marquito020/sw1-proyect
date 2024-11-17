import { BASE_URL } from "../constants/routes";

export const usersUrl = BASE_URL + "/api/users";
export const rolUrl = BASE_URL + "/api/paymentUser";

const getAllUsers = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const addUser = async (url, { arg }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const getUser = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const updateUser = async (url, { arg }) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const updateRol = async (url, { arg }) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const deleteUser = async (url, { arg }) => {
  const response = await fetch(`${url}/${arg}`, { method: "DELETE" });
  const data = await response.json();
  return data;
};

export { getAllUsers, addUser, getUser, updateUser, deleteUser,updateRol };
