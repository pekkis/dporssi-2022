import type { ReactNode } from "react";
import { Box } from "@/components/ui";
import Footer from "./Footer";
import CookieConsent from "./LazyLoadedCookieConsent";
import Header from "./Header";
import Container from "./Container";
import * as styles from "./Layout.css";

const topMenu: string = "70px";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CookieConsent />

      <Box className={styles.grid}>
        <Header topMenu={topMenu} />

        <Box as="main" className={styles.main}>
          <Container>{children}</Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
