import Link from "next/link";

const Logo = () => {
  return (
    <div className="inline-flex items-center font-medium text-2xl">
      <Link href="/">
        <a className="inline-flex gap-4 items-center">
          <img
            src="/images/isotype.svg"
            width={54}
            height={35}
            alt="Stadiaffinity"
          />
          <img
            src="/images/logotype.svg"
            width={127}
            height={24}
            alt=""
            className="hidden md:block"
          />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
