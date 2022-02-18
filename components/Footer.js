import pjson from "../package.json";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="py-20">
      <Container className="text-center">
        <p>Stadiaffinity {pjson.version}</p>
      </Container>
    </footer>
  );
};

export default Footer;
