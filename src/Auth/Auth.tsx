export const logout = (navigate: any) => {
  sessionStorage.clear();
  localStorage.clear();
  navigate("/saturno/login/");
};

export const isLoggedIn = (isLogged?: boolean) => {
  const hasApiToken = !!sessionStorage.getItem("apiToken");
  const hasUserId = !!sessionStorage.getItem("userId");
  const hasGoogleToken = !!sessionStorage.getItem("googleToken");
  return isLogged || (hasApiToken && hasUserId) || hasGoogleToken;
};
