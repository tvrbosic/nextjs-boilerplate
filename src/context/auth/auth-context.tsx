'use client';
// LIB
import { createContext, useState } from 'react';

// TYPES
import { IAuthContext, IAuthContextUser } from '@/context/auth/types';
import { IChildrenProps } from '@/types/global';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: IChildrenProps) => {
  const [user, setUser] = useState<IAuthContextUser | null>(null);

  const clearUser = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
