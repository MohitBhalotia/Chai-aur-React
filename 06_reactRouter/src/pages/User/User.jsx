import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  return (
    <div className="text-center text-3xl py-4 bg-gray-600 text-white">User : {id}</div>
  );
}

export default User;
