import Link from "next/link";
import Container from "./Container";
import Divider from "./Divider";

const Footer = () => {
  return (
    <footer className="py-8 bg-black">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[5%]">
        <div className="font-light text-center md:text-left">
          <div className="flex gap-4 items-center mb-4 text-sm justify-center md:justify-start">
            <img src="/images/isotype.svg" width="53" height="34" />
            <img src="/images/logotype.svg" width="126" height="23" />
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

          <a
            href="https://www.buymeacoffee.com/emmgfx"
            className="inline-block mx-auto"
          >
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=emmgfx&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
          </a>
        </div>
        <div className="text-center md:text-right">
          <h3 className="mb-4">
            Project deveploed using <strong>open source tools</strong>
          </h3>
          <div className="flex gap-4 justify-center md:justify-end">
            <div className="block w-10 h-10 bg-white rounded" />
            <div className="block w-10 h-10 bg-white rounded" />
            <div className="block w-10 h-10 bg-white rounded" />
          </div>
        </div>
      </Container>
      <Divider className="mt-14 mb-5" />
      <Container>
        <div className="flex flex-col md:flex-row items-center text-center md:justify-between gap-4">
          <p className="text-center md:text-left">
            &copy; 2022,{" "}
            <Link href="https://www.viciana.me">we are Marmota</Link>
          </p>
          <p className="flex flex-col md:flex-row gap-2 md:gap-10 justify-center md:justify-end">
            <Link href="https://www.viciana.me">
              <a className="inline-block">Aviso legal</a>
            </Link>
            <Link href="https://www.viciana.me">
              <a className="inline-block">Política de privacidad</a>
            </Link>
            <Link href="https://www.viciana.me">
              <a className="inline-block">Política de cookies</a>
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
