import React, { createContext, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

interface ClearCookiesProviderProps {
  children: React.ReactNode;
}

const ClearCookiesContext = createContext<{}>({});

export const ClearCookiesProvider: React.FC<ClearCookiesProviderProps> = ({
  children,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const location = useLocation();

  useEffect(() => {
    const clearCookies = () => {
      Object.keys(cookies).forEach((cookieName) => {
        removeCookie(cookieName, { path: "/" });
      });
    };

    clearCookies();
  }, [location, cookies, removeCookie]);

  return (
    <ClearCookiesContext.Provider value={{}}>
      {children}
    </ClearCookiesContext.Provider>
  );
};

export const useClearCookiesContext = () => useContext(ClearCookiesContext);
