import pjson from "../../package.json";
import Container from "../Container";

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>Stadiaffinity {pjson.version}</p>
      </Container>
    </footer>
  );
};

export default Footer;
