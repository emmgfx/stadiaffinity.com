import Logo from "./Logo";
import SearchForm from "./SearchForm";
import Navigation from "./Navigation";
import Container from "../Container";

const Header = () => {
  return (
    <header className="py-8">
      <Container className="grid gap-4 grid-cols-[auto_auto_auto] md:grid-cols-3 items-center">
        <Logo />
        <SearchForm />
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
