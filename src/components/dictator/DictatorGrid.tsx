import { Box } from "@/components/ui";
import * as styles from "./DictatorGrid.css";
import { FC, memo } from "react";
import { Dictator } from "@/types";
import DictatorGridDictator from "./DictatorGridDictator";
import {
  ExtraInfoComponent,
  Highlighter
} from "@/components/dictator-search/service";

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
    <Box className={styles.grid}>
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
