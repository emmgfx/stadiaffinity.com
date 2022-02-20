import pjson from "../package.json";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="py-8 bg-black">
      <Container className="grid grid-cols-1 md:grid-cols-3 md:gap-16">
        <div>
          <div className="flex gap-4 items-center mb-4 text-sm font-light">
            <img src="/images/isotype.svg" width="53" height="34" />
            <img src="/images/logotype.svg" width="126" height="23" />
          </div>
          <p>
            Stadia es un copyright de Google, todas las imágenes y nombres de
            propiedad y marca registrada de Google son propiedad de sus
            respectivos dueños.
          </p>
        </div>
        <div className="md:text-center">
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
        <div className="text-right">
          <h3 className="mb-4">
            Project deveploed using <strong>open source tools</strong>
          </h3>
          <div className="flex gap-4 justify-end">
            <div className="block w-10 h-10 bg-white rounded" />
            <div className="block w-10 h-10 bg-white rounded" />
            <div className="block w-10 h-10 bg-white rounded" />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
