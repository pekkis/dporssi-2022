import Footer from "./Footer";
import CookieConsent from "./LazyLoadedCookieConsent";
import Header from "./Header";
import Container from "./Container";

const topMenu: string = "70px";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <CookieConsent />

      <div
        className="grid min-h-screen"
        style={{
          gridTemplateAreas: '"header" "main" "footer"',
          gridTemplateRows:
            "minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, 1fr)"
        }}
      >
        <Header topMenu={topMenu} />

        <main
          className="my-8"
          style={{ gridArea: "main", height: "100%" }}
        >
          <Container>{children}</Container>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
