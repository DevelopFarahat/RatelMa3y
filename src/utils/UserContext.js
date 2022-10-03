import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const accToken = localStorage.getItem("accessToken");
    if (accToken === null) return setUser(null);

    const userInLocal = JSON.parse(localStorage.getItem("user")) ?? {};

    let decoded = accToken.split(".")[1];
    let ObjDecoded = JSON.parse(atob(decoded));
    setUser({ ...userInLocal, ...ObjDecoded });

    //Update user data when opening the site
    axios
      .get(
        `${process.env.REACT_APP_BACK_HOST_URL}/api/${ObjDecoded.role}s/${ObjDecoded._id}`
      )
      .then((res) => setUser({ ...res.data, ...ObjDecoded }))
      .catch((e) => {
        //Logout and back reload all
        console.error(e);
        let lang = localStorage.getItem("i18nextLng");
        setUser(null);
        localStorage.clear();
        localStorage.setItem("i18nextLng", lang);
      });
  }, [localStorage.getItem("accessToken")]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
