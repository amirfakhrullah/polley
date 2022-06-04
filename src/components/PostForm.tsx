import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostValidation } from "../utils/validations";

const PostForm: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("post.create", {
    onSuccess: () => {
      client.invalidateQueries(["post.get-all-posts"]);
      reset();
      setOpen(false);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(createPostValidation),
  });

  const onSubmit = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    mutate({
      title,
      description,
    });
  };

  if (!open) return <></>;

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-20">
      <div className="mt-10 p-4 w-full max-w-3xl mx-auto border border-gray-500 rounded-lg bg-slate-800">
        <h3 className="font-bold text-2xl text-gray-200">Post</h3>

        <Input
          title="Title"
          type="input"
          placeholder="Insert post title"
          register={register("title")}
          error={errors.title}
        />

        <Input
          title="Content"
          type="textarea"
          placeholder="Insert your post content here..."
          register={register("description")}
          error={errors.description}
        />

        <div className="flex justify-end">
          {isLoading ? (
            <p className="text-white">Publishing...</p>
          ) : (
            <>
              <button
                type="button"
                className="mr-2 mt-2 py-2 px-4 rounded-md inline-block border border-gray-500 hover:bg-gray-600 cursor-pointer text-sm text-white font-medium"
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="mt-2 py-2 px-4 rounded-md inline-block bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-sm text-white font-medium"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                Publish
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostForm;
