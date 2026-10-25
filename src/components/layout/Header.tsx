import { FC, useState } from "react";
import { Box, Flex, Heading, MenuButton } from "@/components/ui";
import Adi from "@/components/Adi";
import Container from "./Container";
import MainMenu from "./MainMenu";
import MobileMenu from "./MobileMenu";
import { Default, Mobile } from "./Responsive";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useRouter } from "next/router";
import * as styles from "./Header.css";

type Props = {
  topMenu: string;
};

const Header: FC<Props> = ({ topMenu }) => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <>
      {isOpen && <Box className={styles.overlay} />}

      <Box as="header" className={styles.header}>
        <Container>
          <Flex className={styles.bar}>
            <Box className={styles.logo}>
              <Adi
                className={styles.logoImage}
                onClick={() => {
                  router.push("/");
                }}
              />
            </Box>
            <Box className={styles.titleBox}>
              <Heading as="h1" className={styles.title}>
                {t("Diktaattoripörssi")}
              </Heading>
            </Box>
            <Box className={styles.menuBox}>
              <Mobile>
                <MenuButton
                  onClick={() => setOpen(!isOpen)}
                  className={styles.menuButton}
                />
              </Mobile>

              <Default>
                <MainMenu className={styles.mainMenu} />
              </Default>
            </Box>
          </Flex>
        </Container>
        <Mobile>{isOpen && <MobileMenu topMenu={topMenu} />}</Mobile>
      </Box>
    </>
  );
};

export default memo(Header);
