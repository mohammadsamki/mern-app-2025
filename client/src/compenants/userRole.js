// compeanants/userRole.js
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export const UserRoleContext = createContext(null);

function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // only token; NOT role
      if (!token) {
        setRole(null);
        return;
      }

      // Option A: ask backend for the current user
      try {
        const res = await axios.get('http://127.0.0.1:4000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRole(res.data?.user?.role ?? null);
      } catch (err) {
        // Option B (fallback): decode role from JWT if backend /me isn't available
        const payload = decodeJwt(token);
        setRole(payload?.user?.role ?? payload?.role ?? null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const login = (newRole /*, token? */) => {
    // token is handled by your login page; we never touch localStorage for role
    setRole(newRole ?? null);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token'); // clear auth token
    setRole(null);
  };

  const value = useMemo(
    () => ({ role, loading, login, logout, refresh: fetchRole }),
    [role, loading]
  );

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const ctx = useContext(UserRoleContext);
  if (!ctx) throw new Error('useUserRole must be used within a UserRoleProvider');
  return ctx;
};
