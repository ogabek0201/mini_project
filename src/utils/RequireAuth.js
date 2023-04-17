import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
  let [isAuth, setAuth] = useState(
    JSON.parse(sessionStorage.getItem("isLogged"))
  );
  let location = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("isLogged") == null) {
      setAuth(false);
    }
  }, [isAuth]);

  if (isAuth === false) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
