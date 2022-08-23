import { useRouter } from "next/router";

import { useSearchStore } from "../../store/stores";

const SearchForm = () => {
  const router = useRouter();
  const { term, setTerm } = useSearchStore((state) => state);

  const submit = (e) => {
    e.preventDefault();
    if (term !== "") {
      router.push({
        pathname: "/search/[term]",
        query: { term },
      });
    } else if (router.route === "/search/[term]") {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="relative w-full before:content-[''] before:absolute before:block before:w-4 before:h-4 before:z-10 before:bg-[url(/images/icons/search.svg)] before:top-[50%] before:left-4 before:translate-y-[-50%]"
    >
      <input
        type="text"
        value={term}
        className="w-full py-3 px-4 pl-11 text-center rounded-full bg-white/10 focus:bg-white/20 backdrop-blur-lg font-extralight focus:outline-none placeholder:text-white"
        placeholder="Search games and rate them"
        onChange={(e) => setTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
