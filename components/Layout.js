import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
