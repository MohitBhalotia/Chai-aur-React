import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, PostCard } from "../../components";
import { getAllPosts } from "../../store/slices/postSlice";
import { selectUserPosts } from "../../store/selectors/postSelectors";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton CSS

const AllPosts = () => {
  const dispatch = useDispatch();

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

  // Render Skeletons during loading
  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="w-full border border-black bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg"
      >
        {/* Skeleton for Image */}
        <div className="w-full mb-2 p-4">
          <Skeleton height={192} className="w-full rounded-t-lg" />
        </div>
        {/* Skeleton for Title */}
        <div className="p-4">
          <Skeleton height={24} />
        </div>
      </div>
    ));
  };

  // Error state handling
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
          {loading ? <Skeleton width={150} /> : "My Posts"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? renderSkeletons()
            : posts.map((post) => <PostCard key={post.$id} post={post} />)}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
