import { BASE_URL } from "../constants/routes";

export const authRegisterUrl = BASE_URL + "/api/register";
export const authLoginUrl = BASE_URL + "/api/login";

const login = async (url, { arg }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  return data;
};

const registerNewUser = async (url, { arg }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  return data;
};


export { registerNewUser, login };
