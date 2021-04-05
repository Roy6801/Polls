import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    return window.localStorage.getItem("polls-manager-system-G22");
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    window.localStorage.setItem("polls-manager-system-G22", userToken);
    setToken(userToken);
  };

  return { setToken: saveToken, token };
};

export default useToken;
