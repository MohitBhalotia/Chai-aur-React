import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/slices/authSlice";
import { Button, Input, Logo, PasswordInput } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, error } = useSelector((state) => state.auth);

  const login = async (data) => {
    try {
      const response = await dispatch(authLogin(data));
      if (response.meta.requestStatus === "fulfilled") navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <span className="inline-block w-20 mx-auto">
            <Logo />
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-100 text-center">
          Sign in to your account
        </h2>
        <p className="mt-4 text-gray-400 text-center">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="text-blue-400 hover:underline">
            Signup
          </Link>
        </p>
        {error && (
          <p className="mt-4 text-center text-lg text-red-500">{error}</p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="Email"
              autoComplete="email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              })}
              error={errors.email?.message}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
            />
            <Button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
              } text-gray-100`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
