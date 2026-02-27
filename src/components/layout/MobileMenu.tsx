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
    if (!elm) return;
    disableBodyScroll(elm);
    return () => {
      enableBodyScroll(elm);
    };
  });

  return (
    <div ref={ref} className="bg-primary text-white">
      <MainMenu mobile />
    </div>
  );
};

export default memo(Menu);
