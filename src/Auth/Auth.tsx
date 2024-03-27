export const logout = (navigate: any) => {
  sessionStorage.clear();
  localStorage.clear();
  navigate("/saturno/login/");
};

export const isLoggedIn = (isLogged?: boolean) => {
  const hasCredentials = !!sessionStorage.getItem("credentials");
  const hasApiToken = !!sessionStorage.getItem("apiToken");

  return hasCredentials || isLogged || hasApiToken;
};
