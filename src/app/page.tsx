import type { Metadata } from "next";
import { pageMetadata } from "@/services/metadata";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import PropagandaTube from "@/components/LazyLoadedPropagandaTube";
import type { ReactElement } from "react";
import { Box, Paragraph } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "@/styles/pages/index.css";
import SectionHeading from "@/components/SectionHeading";
import InternalLink from "@/components/InternalLink";
import { Locale, url } from "@/services/url";
import { DateTime } from "luxon";
import { FaAngleDoubleRight } from "react-icons/fa";
import DictatorGrid from "@/components/dictator/DictatorGrid";
import ContentBox from "@/components/layout/ContentBox";
import type { Dictator, FakeNewsHeadline, TubeItem, TubeVideo } from "@/types";
import ExtraInfoBox from "@/components/dictator-search/ExtraInfoBox";
import { createDate } from "@/services/date";

// Regenerated every 12 hours, as before.
export const revalidate = 43200;

export const metadata: Metadata = pageMetadata({
  title: "Tervetuloa",
  path: "/"
});

type FrontPage = {
  videos: TubeItem[];
  propaganda: FakeNewsHeadline[];
  dictators: Dictator[];
};

const videosPlusUkraine = (videos: TubeVideo[]): TubeItem[] => {
  return [
    {
      ukraine: true
    },
    ...videos
  ];
};

const getFrontPage = async (): Promise<FrontPage> => {
  const query = gql`
    query FrontPage {
      dictatorCollection(
        locale: "fi"
        limit: 10
        order: [sys_publishedAt_DESC]
      ) {
        items {
          sys {
            publishedAt
            id
          }
          name
          canonicalRanking
          slug
          majorStoryUpdateAt
          primaryImage {
            width
            height
            url
            description
            title
          }
        }
      }
      propagandaCollection(locale: "fi", order: [date_DESC], limit: 5) {
        items {
          slug
          date
          title
          sys {
            id
          }
        }
      }
      tubeCollection(
        locale: "fi"
        where: { featured: true }
        order: [weight_ASC]
      ) {
        items {
          title
          featured
          weight
          videoId
        }
      }
    }
  `;

  const res = await graphQLClient.request(query);

  return {
    propaganda: res.propagandaCollection.items,
    dictators: res.dictatorCollection.items,
    videos: videosPlusUkraine(res.tubeCollection.items)
  };
};

const PublishedAt = ({ dictator }: { dictator: Dictator }): ReactElement => (
  <ExtraInfoBox>
    {createDate(dictator.sys.publishedAt).toLocaleString()}
  </ExtraInfoBox>
);

export default async function IndexPage() {
  const { videos, propaganda, dictators } = await getFrontPage();

  return (
    <ContentBox>
      <Box className={styles.grid}>
        <Box as="section" className={styles.header}>
          <SectionHeading>Puhemiehen tervehdys!</SectionHeading>

          <Paragraph>
            Tervetuloa Diktaattoripörssiin, kirjaimellisesti historialliseen
            verkkoteokseen jonka tekemiseen sinäkin voit osallistua. Minä olen{" "}
            <strong>Pekkis</strong>, ajatusten Vantaanakin tunnettu,
            Diktaattoripörssin elinikäinen varapresidentti ja kunnioitettu
            puhemies.
          </Paragraph>

          <Paragraph>
            Tietosanakirjaa lainatakseni: <strong>diktaattori</strong> (lat.
            dictator, sanelija) on henkilö, jolla on valtiossa rajaton
            hallintavalta usein vallananastuksen perusteella. Diktatuurille on
            ominaista poliittisen opposition tukahduttaminen sekä sananvapauden
            ja muiden perinteisten vapauksien rajoittaminen.
          </Paragraph>

          <Paragraph>
            Diktaattoripörssi{" "}
            <InternalLink
              to={url(
                "dictatorIndex",
                process.env.NEXT_PUBLIC_LOCALE as Locale
              )()}
            >
              laittaa maailman pahimmat diktaattorit järjestykseen.
            </InternalLink>{" "}
            Näin on aina ollut ja on aina oleva,{" "}
            <InternalLink
              to={url("about", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
            >
              jo yli 20 vuoden ajan
            </InternalLink>
            . Lyhyempääkin valtakuntaa on kutsuttu tuhatvuotiseksi.
          </Paragraph>

          <Paragraph>
            Herättääkö Diktaattoripörssi sinussa ajatuksia? Kerro niistä{" "}
            <InternalLink
              to={url(
                "guestbookIndex",
                process.env.NEXT_PUBLIC_LOCALE as Locale
              )()}
            >
              kirjoittamalla vieraskirjaan
            </InternalLink>
            . Siitä vekkulista on vuosien mittaan riittänyt jos jonkinlaista
            hupia.
          </Paragraph>
        </Box>

        <Box className={styles.fakeNews}>
          <SectionHeading>Valeuutiset</SectionHeading>

          {propaganda.map((item) => {
            const date = DateTime.fromISO(item.date)
              .setZone("Europe/Helsinki")
              .setLocale("fi");

            const link = url(
              "newsItem",
              process.env.NEXT_PUBLIC_LOCALE as Locale
            )(item);

            return (
              <Box
                className={sprinkles({ my: 2 })}
                key={item.sys.id}
                as="article"
              >
                <div>
                  <strong>
                    <time dateTime={date.toISODate() ?? undefined}>
                      {date.setLocale("fi").toLocaleString()}
                    </time>
                  </strong>
                </div>
                <InternalLink to={link}>{item.title}</InternalLink>
              </Box>
            );
          })}

          <Box className={sprinkles({ mt: 3 })}>
            <InternalLink
              to={url("newsIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
            >
              <FaAngleDoubleRight className={styles.moreIcon} />
              Lisää valeuutisia
            </InternalLink>
          </Box>
        </Box>

        <Box className={styles.propagandaTube}>
          <Box>
            <SectionHeading>Propagandatuubi</SectionHeading>
            <PropagandaTube videos={videos} />
          </Box>
        </Box>

        <Box as="section" className={styles.dictators}>
          <SectionHeading>Viimeksi päivitetyt diktaattorit</SectionHeading>

          <DictatorGrid
            dictators={dictators}
            extraInfo={PublishedAt}
            fadeOutIf={() => true}
          />

          <Box className={styles.allDictators}>
            <InternalLink
              to={url("dictators", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
            >
              <FaAngleDoubleRight className={styles.moreIcon} />
              Kaikki diktaattorit
            </InternalLink>
          </Box>
        </Box>
      </Box>
    </ContentBox>
  );
}
