import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { verifyToken, selectAuthStatus } from "./authSlice";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("authStatus", authStatus);
    if (authStatus === "idle") {
      dispatch(verifyToken())
        .unwrap()
        .catch(() => navigate("/auth/signin"));
    }
  }, [dispatch, authStatus]);

  return children;
};

export default ProtectedRoutes;
