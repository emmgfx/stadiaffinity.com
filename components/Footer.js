import Link from "next/link";
import Container from "./Container";
import Divider from "./Divider";

import Isotype from "../public/images/isotype.svg";
import Logotype from "../public/images/logotype.svg";
import BuyMeACoffee from "../public/images/buymeacoffee.svg";
import LogoNextJS from "../public/images/icons/nextjs.svg";
import LogoSupabase from "../public/images/icons/supabase.svg";
import LogoTailwind from "../public/images/icons/tailwind.svg";

const Footer = () => {
  return (
    <footer className="py-8 bg-black">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[5%]">
        <div className="font-light text-center md:text-left">
          <div className="flex gap-4 items-center mb-4 text-sm justify-center md:justify-start">
            <Isotype />
            <Logotype />
          </div>
          <p className="mb-4">
            Stadia is a copyright from Google. All images and trademarks are
            property of his respective owners.
          </p>
        </div>
        <div className="text-center">
          <h3 className="mb-4">
            Do you want to <strong>support our work</strong>?
          </h3>

          <Link href="https://www.buymeacoffee.com/emmgfx">
            <a target="_blank" className="inline-block mx-auto">
              <BuyMeACoffee />
            </a>
          </Link>
        </div>
        <div className="text-center md:text-right">
          <h3 className="mb-4">
            Project deveploed using <strong>open source tools</strong>
          </h3>
          <div className="flex gap-4 justify-center md:justify-end">
            <LogoTailwind width="32px" height="32px" />
            <LogoNextJS width="32px" height="32px" />
            <LogoSupabase width="32px" height="32px" />
          </div>
        </div>
      </Container>
      <Divider className="mt-14 mb-5" />
      <Container>
        <div className="flex flex-col md:flex-row items-center text-center md:justify-between gap-4">
          <p className="text-center md:text-left">
            &copy; 2022,{" "}
            <Link href="https://www.viciana.me">
              <a target="_blank">we are Marmota</a>
            </Link>
          </p>
          <p className="flex flex-col md:flex-row gap-2 md:gap-10 justify-center md:justify-end">
            <Link href="https://www.viciana.me">
              <a className="inline-block" target="_blank">
                Aviso legal
              </a>
            </Link>
            <Link href="https://www.viciana.me">
              <a className="inline-block" target="_blank">
                Política de privacidad
              </a>
            </Link>
            <Link href="https://www.viciana.me">
              <a className="inline-block" target="_blank">
                Política de cookies
              </a>
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
