'use client';
// LIB
import { createContext, useState } from 'react';

// TYPES
import { IAuthContext } from '@/context/auth/types';
import { IChildrenProps } from '@/types/global';
import { User } from '@prisma/client';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: IChildrenProps) => {
  const [user, setUser] = useState<User | null>(null);

  const clearUser = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
