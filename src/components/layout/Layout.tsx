import { Box } from "@/components/styled/Box";
import Footer from "./Footer";
import CookieConsent from "./LazyLoadedCookieConsent";
import Header from "./Header";
import Container from "./Container";
import { layout, main } from "./Layout.css";

const topMenu: string = "70px";

const Layout = ({ children }) => {
  return (
    <>
      <CookieConsent />

      <div className={layout}>
        <Header topMenu={topMenu} />

        <Box as="main" mx="0" my="4" className={main}>
          <Container>{children}</Container>
        </Box>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
