import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/slices/authSlice";
import { Button, Input, Logo } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    try {
      const session = await dispatch(authLogin(data));
      if (session) {
        const userData = useSelector((state) => state.auth.userData);
        if (userData) navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <span className="inline-block w-20 mx-auto">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Sign in to your account
        </h2>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
        {/* {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )} */}
        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              children={"Sign in"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
