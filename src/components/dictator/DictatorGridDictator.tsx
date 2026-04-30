import { FC, memo } from "react";
import { Dictator } from "@/types";
import InternalLink from "@/components/InternalLink";
import {
  ExtraInfoComponent,
  Highlighter
} from "@/components/dictator-search/service";
import Image from "@/components/contentful/ContentfulImage";
import { useRouter } from "next/router";
import {
  card,
  imageWrap,
  nameWrap,
  portrait,
  ranking
} from "./DictatorGridDictator.css";

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
      className={isActive ? card.highlighted : card.fadedOut}
      onClick={() => {
        router.push(to);
      }}
    >
      <div className={imageWrap}>
        {dictator.canonicalRanking && (
          <div className={ranking}>{dictator.canonicalRanking}</div>
        )}
        <Image
          data={dictator.primaryImage}
          config={{ width: 150, aspectRatio: 0.75, fit: "fill", focus: "face" }}
          className={portrait}
          alt={dictator.name}
        />
      </div>
      <div className={nameWrap}>
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
