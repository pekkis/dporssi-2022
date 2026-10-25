import { Box } from "@/components/ui";
import { FC, memo, useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import MainMenu from "./MainMenu";
import * as styles from "./MobileMenu.css";

type Props = {
  topMenu: string;
};

const Menu: FC<Props> = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elm = ref.current;
    disableBodyScroll(elm);
    return () => {
      enableBodyScroll(elm);
    };
  });

  return (
    <Box ref={ref} className={styles.menu}>
      <MainMenu className={styles.nav} />
    </Box>
  );
};

export default memo(Menu);
