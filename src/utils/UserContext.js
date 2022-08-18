import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  //أنا كنت باشوف هو ليه الكونتكست مبياخدش التحديثات مع التغيير في المستخدم


  useEffect(() => {
    console.log('bssv')
    const accToken = localStorage.getItem("accessToken");
    if (accToken == null) return setUser(null);
    
    let decoded = accToken.split(".")[1];
    setUser({...user,...JSON.parse(atob(decoded))});
    console.log("user",user);
  }, [localStorage.getItem("accessToken")]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
