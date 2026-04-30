import { FC, memo, useEffect, useRef } from "react";
import { Box } from "@/components/styled/Box";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import MainMenu from "./MainMenu";

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
    <Box ref={ref} backgroundColor="primary" color="white">
      <Box mx="2" mb="2">
        <MainMenu />
      </Box>
    </Box>
  );
};

export default memo(Menu);
