import { createContext, useContext } from "react";
import { ReactNode, useState } from "react";

import { fakeAuthProvider } from "./fakeAuthProvider";

export interface AuthContextType {
  user: any;
  signin: (user: string) => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as unknown as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode; }) {
  const [user, setUser] = useState<any>(null);

  const signin = async (newUser: string) => {
    await fakeAuthProvider.signin(newUser);
    setUser(newUser);
  };

  const signout = async () => {
    await fakeAuthProvider.signout();
    setUser(null);
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
