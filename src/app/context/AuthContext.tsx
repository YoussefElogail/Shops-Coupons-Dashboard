"use client";

import { useContext, createContext, useState } from "react";
interface AuthContextType {
  token: string | null | undefined;
  setToken: (token: string | null | undefined) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
});
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null | undefined>("");
  return (
    <AuthContext.Provider
      value={{
        token: token,
        setToken: setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const { token, setToken } = useContext(AuthContext);
  return { token, setToken };
};
