import { FC, useState } from "react";
import { Box } from "@/components/styled/Box";
import { Heading } from "@/components/styled/Heading";
import { MenuButton } from "@/components/styled/form";
import Adi from "@/components/Adi";
import Container from "./Container";
import MainMenu from "./MainMenu";
import MobileMenu from "./MobileMenu";
import { Default, Mobile } from "./Responsive";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useRouter } from "next/router";
import {
  adiClickable,
  adiSlot,
  header,
  headerInner,
  menuButtonShadow,
  menuSlot,
  overlay,
  title,
  titleSlot
} from "./Header.css";

type Props = {
  topMenu: string;
};

const Header: FC<Props> = ({ topMenu }) => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <>
      {isOpen && <div className={overlay} />}

      <header className={header} style={{ minHeight: topMenu }}>
        <Container>
          <div className={headerInner} style={{ height: topMenu }}>
            <Box m="1" className={adiSlot}>
              <Adi
                className={adiClickable}
                onClick={() => {
                  router.push("/");
                }}
              />
            </Box>
            <Box p="0" ml="2" className={titleSlot}>
              <Heading as="h1" className={title}>
                {t("Diktaattoripörssi")}
              </Heading>
            </Box>
            <Box m="1" className={menuSlot}>
              <Mobile>
                <MenuButton
                  onClick={() => setOpen(!isOpen)}
                  className={menuButtonShadow}
                />
              </Mobile>

              <Default>
                <MainMenu />
              </Default>
            </Box>
          </div>
        </Container>
        <Mobile>{isOpen && <MobileMenu topMenu={topMenu} />}</Mobile>
      </header>
    </>
  );
};

export default memo(Header);
