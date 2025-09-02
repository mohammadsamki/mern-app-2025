//  crete a global state to return the user  role
import React, { createContext, useContext, useState, useEffect } from 'react';

export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState('user'); // Default role is 'user'
//  load role from local storage on initial render
  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole);
    }

  }, []);
//   save role to local storage whenever it changes
const login = (role)=>{
    localStorage.setItem('role', role);
    console.log("role in context:", role);
    setRole(role);
}
const logout = ()=>{
    localStorage.removeItem('role');
    setRole(null);
}
  return (
    <UserRoleContext.Provider value={{ role, login, logout }}>
        {children}
        </UserRoleContext.Provider>
    );
}

// export const useUserRole = () => {
//   const context = useContext(UserRoleContext);
//   if (!context) {
//     throw new Error('useUserRole must be used within a UserRoleProvider');
//   }
//   return context;
// };
