import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { useRouter } from "next/router";

const SearchForm = () => {
  const router = useRouter();
  // const { term } = useSelector((state) => state.search);
  // const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(null);

  const [, cancel] = useDebounce(() => setDebouncedTerm(term), 1000, [term]);

  useEffect(() => {
    if (!router.query.term) return;
    setTerm(router.query.term || "");
  }, [router.query]);

  useEffect(() => {
    if (!debouncedTerm) return;
    const handleRouteChange = (url) => {
      if (!url.startsWith(`/search/`)) setTerm("");
    };

    router.events.on("routeChangeStart", handleRouteChange);

    if (debouncedTerm !== "") {
      router.push({
        pathname: "/search/[term]",
        query: { term },
      });
    } else if (router.route === "/search/[term]") {
      router.push("/");
    }

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [debouncedTerm]);

  return (
    <form className="relative w-full before:content-[''] before:absolute before:block before:w-4 before:h-4 before:z-10 before:bg-[url(/images/icons/search.svg)] before:top-[50%] before:left-4 before:translate-y-[-50%]">
      <input
        type="text"
        value={term}
        className="w-full py-3 px-4 pl-11 text-center rounded-full bg-white/10 backdrop-blur-lg font-light focus:outline-none "
        placeholder="Search games and rate them"
        onChange={(e) => setTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
