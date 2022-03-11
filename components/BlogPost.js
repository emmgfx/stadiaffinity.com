import Link from "next/link";

const BlogPost = ({ post }) => {
  return (
    <article className="flex flex-col">
      <img
        src={post.jetpack_featured_media_url}
        className="w-full aspect-video object-cover"
      />
      <div className="p-6 bg-white/10 flex-grow">
        <div className="font-normal text-sm mb-2">
          {new Date(post.date).toLocaleDateString()}
        </div>
        <h1 className="line-clamp-3 font-bold text-xl">
          <Link href={post.link}>
            <a target="_blank">{post.title.rendered}</a>
          </Link>
        </h1>
      </div>
    </article>
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
