import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/slices/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => dispatch(logout()));
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
