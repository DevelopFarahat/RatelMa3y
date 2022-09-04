import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //أنا كنت باشوف هو ليه الكونتكست مبياخدش التحديثات مع التغيير في المستخدم

  useEffect(() => {
    const accToken = localStorage.getItem("accessToken");
    if (accToken == null) return setUser(null);
    
    let decoded = accToken.split(".")[1];
    setUser({...user,...JSON.parse(atob(decoded))});
    console.log("user",user);
  }, [localStorage.getItem("accessToken")]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading,setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
