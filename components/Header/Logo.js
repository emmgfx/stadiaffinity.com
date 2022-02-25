import Link from "next/link";

import Isotype from "../../public/images/isotype.svg";
import Logotype from "../../public/images/logotype.svg";

const Logo = () => {
  return (
    <div className="inline-flex items-center font-medium text-2xl">
      <Link href="/">
        <a className="inline-flex gap-4 items-center">
          <Isotype />
          <Logotype className="hidden md:block" />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
