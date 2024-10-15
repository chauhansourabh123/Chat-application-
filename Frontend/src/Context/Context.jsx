import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null; 
  });

  useEffect(() => {
   
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser"); 
    }
  }, [loggedInUser]);

  return (
    <Context.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
