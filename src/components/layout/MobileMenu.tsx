/** @jsxImportSource theme-ui */
import { Box, jsx } from "theme-ui";
import { FC, memo, useEffect, useRef } from "react";
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
      <MainMenu sx={{ mx: 2, mb: 2 }} />
    </Box>
  );
};

export default memo(Menu);
