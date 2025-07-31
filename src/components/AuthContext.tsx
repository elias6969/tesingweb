import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      // Optional: decode JWT and get username
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || null;
    }
    return null;
  });

  const login = (username: string) => setUser(username);
  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
