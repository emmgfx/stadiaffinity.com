import Link from "next/link";

const BlogPost = ({ post }) => {
  return (
    <Link href={post.link}>
      <a target="_blank" className="flex flex-col">
        <article className="flex flex-col grow transition hover:bg-white/10">
          <img
            src={post.jetpack_featured_media_url}
            className="w-full aspect-video object-cover"
            alt=""
          />
          <div className="p-6 bg-white/10 flex-grow">
            <div className="font-normal text-xs sm:text-sm mb-2">
              {new Date(post.date).toLocaleDateString()}
            </div>
            <h1 className="line-clamp-2 sm:line-clamp-3 font-bold sm:text-xl">
              {post.title.rendered}
            </h1>
          </div>
        </article>
      </a>
    </Link>
  );
};

const BlogPostPhantom = ({ post }) => {
  return (
    <article>
      <div className="aspect-video bg-white/20 animate-pulse" />
      <div className="p-6 bg-white/10">
        <div className="font-normal text-sm mb-2">Loading</div>
        <h1 className="truncate font-bold text-xl">Loading</h1>
      </div>
    </article>
  );
};

export { BlogPost, BlogPostPhantom };
