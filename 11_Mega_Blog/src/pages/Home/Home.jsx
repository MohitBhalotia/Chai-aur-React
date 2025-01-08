import React, { useEffect } from "react";
import { Container, PostCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/slices/postSlice";

const Home = () => {
  const user = useSelector((state) => state.auth.status);
  const posts = useSelector((state) => state.post.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(getAllPosts());
  }, [dispatch]);

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
  } else if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Container>
          <h1 className="text-3xl font-bold text-center text-gray-700">
            Please add a post!
          </h1>
        </Container>
      </div>
    );
  }

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
