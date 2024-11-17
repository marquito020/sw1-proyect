import useSWRMutation from "swr/mutation";

import {
  authLoginUrl,
  authRegisterUrl,
  login,
  registerNewUser,
} from "../services/auth.service";

const useRegister = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    authRegisterUrl,
    registerNewUser
  );

  return { registerUser: trigger, isMutating, error };
};

const useLogin = () => {
  const { trigger, isMutating, error } = useSWRMutation(authLoginUrl, login);
  return { loginUser: trigger, isMutating, error };
};

export { useRegister, useLogin };
