import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, PostCard } from "../../components";
import { getAllPosts } from "../../store/slices/postSlice";
import { selectUserPosts } from "../../store/selectors/postSelectors";

const AllPosts = () => {
  const dispatch = useDispatch();

  // Use the memoized selector
  const posts = useSelector(selectUserPosts);

  // Get loading and error states
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <p className="text-center text-gray-500 text-lg">Loading posts...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <p className="text-center text-red-500 text-lg">Error: {error}</p>
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
          <p className="text-center text-gray-500 text-lg">No posts available.</p>
        )}
      </Container>
    </div>
  );
};

export default AllPosts;
