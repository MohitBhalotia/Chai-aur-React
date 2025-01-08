import React from "react";
import { Container, PostForm } from "../../components";

const AddPost = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create a New Post
          </h1>
          <PostForm />
        </div>
      </Container>
    </div>
  );
};

export default AddPost;
