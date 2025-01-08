import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import fileService from "../../appwrite/file";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../store/slices/postSlice";
export default function PostForm({ post }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const { slug } = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userData.$id);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await fileService.uploadFile(data.image[0])
        : null;

      if (file) {
        await fileService.deleteFile(post.featuredImage);
      }

      const updatedPost = await dispatch(
        updatePost({
          id: slug,
          data,
          featuredImage: file ? file.$id : undefined,
        })
      );
      navigate(`/post/${updatedPost.payload.$id}`);
    } else {
      const file = await fileService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const createdPost = await dispatch(createPost({ ...data, userId }));
        navigate(`/post/${createdPost.payload.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="gap-6 flex ">
      <div className="w-full md:w-2/3">
        <Input
          label="Title: "
          placeholder="Enter the title"
          className="mb-6"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug: "
          placeholder="Enter the slug"
          className="mb-6"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
          readOnly={post}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full md:w-1/3">
        <Input
          label="Featured Image: "
          type="file"
          className="mb-6"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-6">
            <img
              src={fileService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full rounded-lg shadow-md"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status: "
          className="mb-6"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
