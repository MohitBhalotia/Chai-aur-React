import { lazy, Suspense } from "react";
import AuthLayout from "../Layout/AuthLayout";

// Lazy-loaded components
const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const AddPost = lazy(() => import("../pages/Posts/AddPost"));
const AllPosts = lazy(() => import("../pages/Posts/AllPosts"));
const EditPost = lazy(() => import("../pages/Posts/EditPost"));
const Post = lazy(() => import("../pages/Posts/Post"));

// Route wrappers
const PrivateRoute = ({ children }) => (
  <AuthLayout authentication={true}>{children}</AuthLayout>
);

const PublicRoute = ({ children }) => (
  <AuthLayout authentication={false}>{children}</AuthLayout>
);

// Define all routes
const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PublicRoute>
          <Signup />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "/my-posts",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute>
          <AllPosts />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/add-post",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute>
          <AddPost />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/edit-post/:slug",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute>
          <EditPost />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/post/:slug",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    ),
  },
];

export default routes;
