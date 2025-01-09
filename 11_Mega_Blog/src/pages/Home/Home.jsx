import React, { useEffect } from "react";
import { Container, PostCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/slices/postSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.auth.status);
  const posts = useSelector((state) => state.post.data);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) dispatch(getAllPosts());
  }, [dispatch, user]);

  // Handle unauthenticated state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Container>
          <h1 className="text-3xl font-bold text-center text-gray-700">
            Please login to read blogs!
          </h1>
        </Container>
      </div>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-700">Loading posts...</h1>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Container>
          <h1 className="text-3xl font-bold text-center text-red-500">
            Failed to load posts. Please try again later.
          </h1>
        </Container>
      </div>
    );
  }

  // Handle empty posts state
  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Container>
          <h1 className="text-3xl font-bold text-center text-gray-700">
            Please add a post!
          </h1>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/add-post")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Post
            </button>
          </div>
        </Container>
      </div>
    );
  }

  // Render posts
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Recent Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
