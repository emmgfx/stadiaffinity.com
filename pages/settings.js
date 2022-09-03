import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const Settings = ({}) => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="text-center">
            <iframe
              src="https://giphy.com/embed/3og0IJLjXc84H8K45a"
              frameBorder="0"
              className="w-full max-w-md aspect-square mx-auto"
              allowFullScreen
            ></iframe>
            <p>
              <a href="https://giphy.com/gifs/netflix-3og0IJLjXc84H8K45a">
                via GIPHY
              </a>
            </p>
          <div className="h-8" />
          <PageTitle>Settings</PageTitle>
          <div className="h-8" />
          </div>
        </Container>
        <div className="h-40" />
      </main>
      <Footer />
    </>
  );
};

export default Settings;
