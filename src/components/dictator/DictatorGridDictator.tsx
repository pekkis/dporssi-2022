import { navigate } from "@/services/backwards-compatibility";
import { FC } from "react";
import { Dictator } from "@/types";
import InternalLink from "@/components/InternalLink";
import { memo } from "react";
import {
  ExtraInfoComponent,
  Highlighter
} from "@/components/dictator-search/service";
import Image from "@/components/contentful/ContentfulImage";
import { useRouter } from "next/router";

type Props = {
  extraInfo: ExtraInfoComponent;
  fadeOutIf: Highlighter;
  dictator: Dictator;
};

const DictatorGridDictator: FC<Props> = ({
  extraInfo,
  fadeOutIf,
  dictator
}) => {
  const ExtraInfoComponent = extraInfo;

  const router = useRouter();

  const isActive = fadeOutIf(dictator);
  const to = `/diktaattori/${dictator.slug}`;

  return (
    <div
      className="cursor-pointer"
      style={{
        opacity: isActive ? 1 : 0.66,
        filter: isActive ? undefined : "grayscale(100%) sepia(50%)"
      }}
      onClick={() => {
        router.push(to);
      }}
    >
      <div className="relative">
        {dictator.canonicalRanking && (
          <div className="text-sm text-center absolute top-[-4px] right-[-4px] z-10 text-white bg-link rounded py-1"
            style={{ width: "2em" }}
          >
            {dictator.canonicalRanking}
          </div>
        )}
        <Image
          data={dictator.primaryImage}
          config={{ width: 150, aspectRatio: 0.75, fit: "fill", focus: "face" }}
          className="border border-link rounded block"
          alt={dictator.name}
        />
      </div>
      <div className="overflow-hidden text-ellipsis">
        <div>
          <InternalLink title={dictator.name} to={to}>
            {dictator.name}
          </InternalLink>
        </div>
        <ExtraInfoComponent dictator={dictator} />
      </div>
    </div>
  );
};

export default memo(DictatorGridDictator);
