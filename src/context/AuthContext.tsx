import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { name: string; email: string; phone: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('ms_user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const login = async (email: string, _password: string) => {
    // Mock login: find stored user list
    const listRaw = localStorage.getItem('ms_users');
    if (listRaw) {
      const list: User[] = JSON.parse(listRaw);
      const found = list.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        setUser(found);
        localStorage.setItem('ms_user', JSON.stringify(found));
        return;
      }
    }
    throw new Error('Account not found');
  };

  const signup = async (data: { name: string; email: string; phone: string; password: string }) => {
    const listRaw = localStorage.getItem('ms_users');
    let list: User[] = listRaw ? JSON.parse(listRaw) : [];
    if (list.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error('Email already registered');
    }
    const newUser: User = { id: crypto.randomUUID(), name: data.name.trim(), email: data.email.trim(), phone: data.phone.trim() };
    list.push(newUser);
    localStorage.setItem('ms_users', JSON.stringify(list));
    localStorage.setItem('ms_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
