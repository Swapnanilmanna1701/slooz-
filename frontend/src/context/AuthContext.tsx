"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { User, Role } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isManager: boolean;
  isStoreKeeper: boolean;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedUser = Cookies.get("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        Cookies.remove("token");
        Cookies.remove("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    (newToken: string, newUser: User) => {
      setToken(newToken);
      setUser(newUser);
      Cookies.set("token", newToken, { expires: 1 });
      Cookies.set("user", JSON.stringify(newUser), { expires: 1 });
      router.push(newUser.role === Role.MANAGER ? "/dashboard" : "/products");
    },
    [router]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  }, [router]);

  const isManager = user?.role === Role.MANAGER;
  const isStoreKeeper = user?.role === Role.STORE_KEEPER;
  const hasRole = useCallback((role: Role) => user?.role === role, [user]);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout, isManager, isStoreKeeper, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
