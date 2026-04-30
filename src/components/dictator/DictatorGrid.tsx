import { Box } from "@/components/styled/Box";
import { FC, memo } from "react";
import { Dictator } from "@/types";
import DictatorGridDictator from "./DictatorGridDictator";
import {
  ExtraInfoComponent,
  Highlighter
} from "@/components/dictator-search/service";
import { dictatorGrid } from "./DictatorGrid.css";

type Props = {
  sorter?: Function;
  extraInfo: ExtraInfoComponent;
  fadeOutIf: Highlighter;
  dictators: Dictator[];
};

const DictatorGrid: FC<Props> = ({
  dictators,
  extraInfo = () => null,
  fadeOutIf = () => false
}) => {
  return (
    <Box className={dictatorGrid} gap={{ mobile: "2", tablet: "3" }}>
      {dictators.map((dictator) => {
        return (
          <DictatorGridDictator
            key={dictator.sys.id}
            dictator={dictator}
            fadeOutIf={fadeOutIf}
            extraInfo={extraInfo}
          />
        );
      })}
    </Box>
  );
};

export default memo(DictatorGrid);
