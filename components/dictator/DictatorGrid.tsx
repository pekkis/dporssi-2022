/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import { Box } from "theme-ui";
import { FC, memo, ReactElement } from "react";
import { Dictator } from "../../types";
import DictatorGridDictator from "./DictatorGridDictator";
import { ExtraInfoComponent, Highlighter } from "../dictator-search/service";

type Props = {
  sorter?: Function;
  extraInfo: ExtraInfoComponent;
  fadeOutIf: Highlighter;
  dictators: Dictator[];
};

const DictatorGrid: FC<Props> = ({
  dictators,
  extraInfo = () => null,
  fadeOutIf = () => false,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))",
      }}
    >
      {dictators.map((dictator) => {
        return (
          <DictatorGridDictator
            key={dictator.id}
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
