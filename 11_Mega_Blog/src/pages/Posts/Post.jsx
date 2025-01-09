import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fileService from "../../appwrite/file";
import { Button, Container } from "../../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../store/slices/postSlice";
import postService from "../../appwrite/post";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (slug) {
          const fetchedPost = await postService.getPost(slug);
          setPost(fetchedPost);
        }
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError("Failed to fetch the post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deleteHandler = async () => {
    try {
      const status = await dispatch(deletePost(post.$id));
      if (status) {
        await fileService.deleteFile(post.featuredImage);
        navigate("/my-posts");
      }
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-3xl">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mb-8">
          <img
            src={fileService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full max-h-96 object-cover rounded-lg shadow-md"
          />

          {isAuthor && (
            <div className="flex justify-end mt-4 space-x-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" hoverColor="hover:bg-green-600">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                hoverColor="hover:bg-red-600"
                onClick={deleteHandler}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500 text-lg">Post not found.</p>
    </div>
  );
}
