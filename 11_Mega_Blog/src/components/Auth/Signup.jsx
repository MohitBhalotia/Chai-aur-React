import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerUser } from "../../store/slices/authSlice";
import { Button, Logo, Input } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, error } = useSelector((state) => state.auth);

  const signup = async (data) => {
    try {
      const session = await dispatch(registerUser(data)).unwrap();
      if (session) navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
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
          Create your account
        </h2>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?&nbsp;
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(signup)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required" })}
              error={errors.name?.message}
            />
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
              className={`w-full ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
