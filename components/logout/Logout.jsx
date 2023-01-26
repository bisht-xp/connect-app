import { Logout } from "@mui/icons-material";
import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function SignOut() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      type="button"
    >
      <Logout />
    </button>
  );
}
