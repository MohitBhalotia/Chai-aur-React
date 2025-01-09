import { Client, Databases, Query } from "appwrite";
import config from "../config/config";

export class PostService {
  client = new Client();
  databases;
  constructor() {
    if (
      !config.appwriteUrl ||
      !config.appwriteProjectId ||
      !config.appwriteDatabaseId ||
      !config.appwriteCollectionId
    ) {
      throw new Error("Appwrite configuration is incomplete.");
    }
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      if (!title || !slug || !content) {
        throw new Error("Title, slug, and content are required.");
      }
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error(`Failed to create post: ${error.message}`);
      throw new Error("Unable to create the post. Please try again.");
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      if (!slug || !title || !content) {
        throw new Error("Document ID, title, and content are required.");
      }
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error(`Failed to update post: ${error.message}`);
      throw new Error("Unable to update the post. Please try again.");
    }
  }

  async deletePost(slug) {
    try {
      if (!slug) {
        throw new Error("Document ID is required to delete a post.");
      }
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return { success: true, message: "Post deleted successfully." };
    } catch (error) {
      console.error(`Failed to delete post: ${error.message}`);
      return { success: false, message: "Post deletion failed." };
    }
  }

  async getPost(slug) {
    try {
      if (!slug) {
        throw new Error("Document ID is required to fetch a post.");
      }
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error(`Failed to fetch post: ${error.message}`);
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error(`Failed to fetch posts: ${error.message}`);
      throw new Error("Unable to fetch posts. Please try again.");
    }
  }
}

const postService = new PostService();

export default postService;
