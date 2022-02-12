import pjson from "../package.json";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="py-4">
      <Container className="">
        <p>Stadiaffinity {pjson.version}</p>
      </Container>
    </footer>
  );
};

export default Footer;
