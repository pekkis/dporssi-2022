/** @jsxImportSource theme-ui */

import React, { FC, useState } from "react";
import { Box, Flex, Heading, MenuButton } from "theme-ui";
import Adi from "../Adi";
import Container from "./Container";
import MainMenu from "./MainMenu";
import Menu from "./MobileMenu";
import { Default, Mobile } from "./Responsive";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useRouter } from "next/router";

type Props = {
  topMenu: string;
};

const Header: FC<Props> = ({ topMenu }) => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <>
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, .2)",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 3,
          }}
        />
      )}

      <Box
        as="header"
        sx={{
          gridArea: "header",
          position: "sticky",
          overflow: "visible",
          zIndex: 5,
          top: 0,
          left: 0,
          right: 0,
          minHeight: topMenu,
          boxShadow: "1px 1px 5px rgba(0, 0, 0, .5)",
          bg: "primary",
        }}
      >
        <Container>
          <Flex
            sx={{
              zIndex: 5,
              height: topMenu,
              justifyContent: "center",
              alignItems: "stretch",
              width: "100%",
            }}
          >
            <Box m={1} sx={{ flex: "0 0 50px", alignSelf: "center" }}>
              <Adi
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push("/");
                }}
              />
            </Box>
            <Box
              p={0}
              ml={2}
              sx={{
                flex: "0 0 auto",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              <Heading
                as="h1"
                color="white"
                sx={(theme) => ({
                  textShadow: `2px 2px 2px ${theme.colors?.black}`,
                })}
              >
                {t("Diktaattoripörssi")}
              </Heading>
            </Box>
            <Box
              m={1}
              sx={{
                flex: "1 1 auto",
                alignSelf: "center",
                color: "white",
                textAlign: "right",
              }}
            >
              <Mobile>
                <MenuButton
                  onClick={() => setOpen(!isOpen)}
                  sx={{
                    filter: "drop-shadow(1px 1px 1px #000)",
                    cursor: "pointer",
                  }}
                />
              </Mobile>

              <Default>
                <MainMenu
                  sx={{
                    ul: {
                      display: ["block", "flex"],
                    },
                    li: {
                      display: "inline-block",
                      mx: 1,
                    },
                  }}
                />
              </Default>
            </Box>
          </Flex>
        </Container>
        <Mobile>{isOpen && <Menu topMenu={topMenu} />}</Mobile>
      </Box>
    </>
  );
};

export default memo(Header);
