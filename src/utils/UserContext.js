import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //أنا كنت باشوف هو ليه الكونتكست مبياخدش التحديثات مع التغيير في المستخدم

  useEffect(() => {
    const accToken = localStorage.getItem("accessToken");
    if (accToken === null) return setUser(null);

    const userInLocal = JSON.parse(localStorage.getItem('user'))?? {}
    
    let decoded = accToken.split(".")[1];
    setUser({...userInLocal,...JSON.parse(atob(decoded))});
    console.warn("User State here",user);
  }, [localStorage.getItem("accessToken")]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading,setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
