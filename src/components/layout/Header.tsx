import { FC, useState } from "react";
import { FaBars } from "react-icons/fa";
import Adi from "@/components/Adi";
import Container from "./Container";
import MainMenu from "./MainMenu";
import MobileMenu from "./MobileMenu";
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
        <div
          className="fixed top-0 left-0 bottom-0 right-0 z-[3]"
          style={{ backgroundColor: "rgba(0, 0, 0, .2)" }}
        />
      )}

      <header
        className="sticky overflow-visible z-[5] top-0 left-0 right-0 bg-primary shadow-[1px_1px_5px_rgba(0,0,0,.5)]"
        style={{ gridArea: "header", minHeight: topMenu }}
      >
        <Container>
          <div
            className="flex z-[5] justify-center items-stretch w-full"
            style={{ height: topMenu }}
          >
            <div className="m-1 flex-[0_0_50px] self-center">
              <Adi
                className="cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              />
            </div>
            <div className="p-0 ml-2 flex-[0_0_auto] self-center text-center">
              <h1
                className="text-white text-2xl font-bold"
                style={{ textShadow: "2px 2px 2px #000" }}
              >
                {t("Diktaattoripörssi")}
              </h1>
            </div>
            <div className="m-1 flex-[1_1_auto] self-center text-white text-right">
              <Mobile>
                <button
                  onClick={() => setOpen(!isOpen)}
                  className="text-white cursor-pointer [filter:drop-shadow(1px_1px_1px_#000)]"
                  aria-label="Valikko"
                >
                  <FaBars size={24} />
                </button>
              </Mobile>

              <Default>
                <MainMenu />
              </Default>
            </div>
          </div>
        </Container>
        <Mobile>{isOpen && <MobileMenu topMenu={topMenu} />}</Mobile>
      </header>
    </>
  );
};

export default memo(Header);
