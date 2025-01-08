import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  let post = null;
  if (slug) {
    post = useSelector((state) =>
      state.post.data.find((post) => post.$id === slug)
    );
  } else {
    navigate("/");
  }

  return post ? (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Edit Post
          </h1>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500 text-lg">Loading post...</p>
    </div>
  );
};

export default EditPost;
