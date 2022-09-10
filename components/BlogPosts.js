import { useState, useEffect } from "react";

import { BlogPost, BlogPostPhantom } from "./BlogPost";
import TextGradient from "./TextGradient";

const BlogPosts = ({ term = "", limit = 4, subtype = "post" }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const baseUrl = "https://stadiahoy.com/wp-json/wp/v2/";

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}posts?search=${term}&subtype=${subtype}&per_page=${limit}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, [setPosts, setLoading, term, limit, subtype]);

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
        {loading &&
          [...Array(limit).keys()].map((v, i) => <BlogPostPhantom key={i} />)}
        {!loading &&
          posts.map((post) => <BlogPost key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default BlogPosts;
