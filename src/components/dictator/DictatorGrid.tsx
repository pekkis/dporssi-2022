import { FC, memo } from "react";
import { Dictator } from "@/types";
import DictatorGridDictator from "./DictatorGridDictator";
import {
  ExtraInfoComponent,
  Highlighter
} from "@/components/dictator-search/service";

type Props = {
  sorter?: (dictators: Dictator[]) => Dictator[];
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
    <div className="grid gap-2 sm:gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))" }}>
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
    </div>
  );
};

export default memo(DictatorGrid);
