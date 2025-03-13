'use client';
// LIB
import { createContext, useEffect, useState } from 'react';

// APP
import { verifyToken } from '@/utility/jwt/jwt';
import { AuthApiClient } from '@/api-clients/auth/auth-client';

// TYPES
import { IAuthContext, IAuthContextUser } from '@/context/auth/types';
import { IChildrenProps } from '@/types/global';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: IChildrenProps) => {
  const [user, setUser] = useState<IAuthContextUser | null>(null);

  // Pre-load user session (send verify request which chekcs if session cookie is present)
  useEffect(() => {
    const decodeTokenAndSetAuthUser = async () => {
      // Call API to verify session cookie
      const response = await AuthApiClient.instance.verify();

      // Extract token
      const token = response.data?.token || null;

      if (token) {
        // TOKEN PRESENT: Re-load active session
        const decoded = (await verifyToken(
          token
        )) as unknown as IAuthContextUser;
        setUser(decoded);

        console.log(decoded);
      } else {
        // NO TOKEN: Clear user and continue without user session
        console.warn('No session found!');
        setUser(null);
      }
    };

    decodeTokenAndSetAuthUser().catch((error) => {
      console.error('Invalid session token', error);
      setUser(null);
    });
  }, []);

  const clearUser = async () => {
    await AuthApiClient.instance.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
