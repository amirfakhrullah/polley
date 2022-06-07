import { Post, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type PostWithIsOwner = Post & {
  githubUser: User;
  _count: {
    likes: number;
  };
} & {
  isOwner: boolean;
};

const PostCard: React.FC<PostWithIsOwner> = ({
  id,
  title,
  created,
  githubUser,
  isOwner,
}) => {
  return (
    <div className="my-2 p-5 rounded-lg bg-slate-800 border border-gray-600">
      <h3 className="font-bold text-lg text-gray-200">{title}</h3>
      {githubUser && (
        <div className="flex flex-row items-center my-1">
          <Image
            src={githubUser.image!}
            height={20}
            width={20}
            alt="github avatar"
            className="rounded-full"
          />
          <p className=" ml-2 text-sm font-bold text-gray-400">
            {githubUser.name}
          </p>
        </div>
      )}
      {typeof isOwner === "boolean" && !githubUser && (
        <p className="text-sm font-bold text-gray-400">
          {isOwner ? "By you" : "Anonymous"}
        </p>
      )}
      <p className="text-gray-500">
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(created)}
      </p>
      <div className="flex justify-end">
        <Link href={`/posts/${id}`}>
          <div className="mt-2 py-2 px-4 rounded-md inline-block bg-gray-700 cursor-pointer">
            <p className="text-sm text-white font-medium">Read</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
