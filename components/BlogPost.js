import Image from "next/future/image";
import Link from "next/link";

import { replaceHtmlEntities } from "../utils/entities";

const BlogPost = ({ post }) => {
  return (
    <Link href={post.link}>
      <a target="_blank" className="flex flex-col">
        <article className="flex flex-col grow transition hover:bg-white/10">
          <Image
            src={post.jetpack_featured_media_url}
            className="w-full aspect-video object-cover"
            alt=""
            width={384}
            height={249}
          />
          <div className="p-6 bg-white/10 flex-grow">
            <div className="font-normal text-xs sm:text-sm mb-2">
              {post.date.slice(0, 10)}
              {/* ToDo: This date problem should be solved in node 14 */}
              {/* {new Date(post.date).toLocaleDateString()} */}
            </div>
            <h1 className="line-clamp-2 sm:line-clamp-3 font-bold sm:text-xl">
              {replaceHtmlEntities(post.title.rendered)}
            </h1>
          </div>
        </article>
      </a>
    </Link>
  );
};

export default BlogPost;
