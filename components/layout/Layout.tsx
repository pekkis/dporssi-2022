/** @jsxImportSource theme-ui */

import React from "react";
import { Box } from "theme-ui";
import Footer from "./Footer";
import CookieConsent from "./LazyLoadedCookieConsent";
import Header from "./Header";
import Container from "./Container";

const topMenu: string = "70px";

const Layout = ({ children }) => {
  return (
    <>
      <CookieConsent />

      <Box
        sx={{
          display: "grid",
          minHeight: "100vh",
          gridTemplateAreas: `
        "header"
        "main"
        "footer"
        `,
          gridTemplateRows:
            "[header] minmax(min-content, max-content) [main] minmax(min-content, max-content) [footer] minmax(min-content, 1fr)",
        }}
      >
        <Header topMenu={topMenu} />

        <Box
          mx={0}
          my={4}
          as="main"
          sx={{
            gridArea: "main",
            height: "100%",
          }}
        >
          <Container>{children}</Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
