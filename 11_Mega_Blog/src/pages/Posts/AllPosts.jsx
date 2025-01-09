import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, PostCard } from "../../components";
import { getAllPosts } from "../../store/slices/postSlice";
import { selectUserPosts } from "../../store/selectors/postSelectors";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoized selector for user-specific posts
  const posts = useSelector(selectUserPosts);

  // Loading and error states
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getAllPosts());
    }
  }, [dispatch, posts.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <p
            className="text-center text-gray-500 text-lg"
            aria-live="polite"
          >
            Loading posts...
          </p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4" aria-live="assertive">
              Error: {error}
            </p>
            <button
              onClick={() => dispatch(getAllPosts())}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          All Posts
        </h1>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">No posts available.</p>
            <button
              onClick={() => navigate("/add-post")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add a Post
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllPosts;
