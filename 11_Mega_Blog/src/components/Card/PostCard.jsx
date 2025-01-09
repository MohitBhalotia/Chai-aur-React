import React from "react";
import fileService from "../../appwrite/file";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Link
      to={`/post/${post.$id}`}
      className="block border-black border-2 rounded-xl transform transition hover:scale-105"
    >
      <div className="w-full bg-white rounded-xl overflow-hidden shadow-md  hover:shadow-lg">
        <div className="w-full mb-2 p-4">
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={fileService.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
        </div>
        <div className="p-4">
          <h1
            className="text-lg font-semibold text-gray-800 truncate"
            title={post.title}
          >
            {post.title}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
