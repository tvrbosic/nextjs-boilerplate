'use client';
// LIBRARY
import { createContext, useEffect, useState } from 'react';

// APP
import { verifyToken } from '@/utility/jwt/jwt';
import { AuthApiClient } from '@/api-clients/auth/auth-client';

// TYPES
import { IAuthContext, IAuthContextUser } from '@/context/auth/types';
import { IChildrenProps } from '@/types/global';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: IChildrenProps) => {
  // =================================| STATE |================================= //
  const [user, setUser] = useState<IAuthContextUser | null>(null);
  const [isVerifying, setIsVerifying] = useState(true); // Indicates if the user session is being verified (this way we prevent rendering of protected components before auth check is done)

  // =================================| EFFECTS |================================= //
  // Pre-load user session if cookie exists (send verify request which checks if session cookie is present)
  useEffect(() => {
    const decodeTokenAndSetAuthUser = async () => {
      try {
        // Call API to verify session cookie
        const response = await AuthApiClient.instance.verify();

        // Extract token
        const token = response.data?.token || null;

        if (token) {
          // TOKEN PRESENT: Re-load active session
          const decoded = (await verifyToken(token)) as unknown as IAuthContextUser;
          setUser(decoded);
        } else {
          // NO TOKEN: Clear user and continue without user session
          console.warn('No session found!');
          setUser(null);
        }
      } catch (error) {
        console.error('Invalid session token', error);
        setUser(null);
      } finally {
        setIsVerifying(false); // ✅ End loading
      }
    };

    decodeTokenAndSetAuthUser().catch((error) => {
      console.error('Invalid session token', error);
      setUser(null);
    });
  }, []);

  // =================================| FUNCTIONS |================================= //
  const updateUserAvatar = (avatarImageUrl: string) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, avatarImageUrl } : null));
  };

  const clearUser = async () => {
    await AuthApiClient.instance.logout();
    setUser(null);
  };

  // =================================| RENDER |================================= //

  return (
    <AuthContext.Provider value={{ user, isVerifying, setUser, clearUser, updateUserAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
