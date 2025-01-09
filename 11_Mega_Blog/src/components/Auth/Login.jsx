import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/slices/authSlice";
import { Button, Input, Logo } from "../../components";
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
      const session = await dispatch(authLogin(data)).unwrap();
      if (session) navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
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
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Sign in to your account
        </h2>
        <p className="mt-4  text-gray-600 text-center">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}
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
              error={errors.email?.message}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />
            <Button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
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
