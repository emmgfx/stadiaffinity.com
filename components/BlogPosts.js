import BlogPost from "./BlogPost";
import TextGradient from "./TextGradient";

const BlogPosts = ({ posts }) => {
  return (
    <div>
      <h3 className="uppercase font-light text-xl sm:text-2xl">
        Related posts by{" "}
        <strong className="font-bold">
          <TextGradient>StadiaHoy</TextGradient>
        </strong>
      </h3>
      <div className="h-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
