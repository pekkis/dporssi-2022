/** @jsxImportSource theme-ui */

import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout/Layout";
import { gql } from "graphql-request";
import { graphQLClient } from "../services/graphql";
import PropagandaTube from "../components/LazyLoadedPropagandaTube";
import { FC } from "react";
import SEO from "../components/SEO";
import { Box, Paragraph } from "theme-ui";
import SectionHeading from "../components/SectionHeading";
import InternalLink from "../components/InternalLink";
import { Locale, url } from "../services/url";
import { DateTime } from "luxon";
import { FaAngleDoubleRight } from "react-icons/fa";
import DictatorGrid from "../components/dictator/DictatorGrid";
import { sortrados } from "../components/dictator-search/service";
import { GetStaticProps } from "next";
import { hours } from "../services/cache";
import ContentBox from "../components/layout/ContentBox";

type Props = {
  videos: Array<{}>;
  propaganda: [];
  dictators: [];
};

const videosPlusUkraine = (videos) => {
  return [
    {
      ukraine: true
    },
    ...videos
  ];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const query = gql`
    query FrontPage {
      dictatorCollection(
        locale: "fi"
        limit: 10
        order: [majorStoryUpdateAt_DESC]
      ) {
        items {
          sys {
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
    props: {
      propaganda: res.propagandaCollection.items,
      dictators: res.dictatorCollection.items,
      videos: videosPlusUkraine(res.tubeCollection.items)
    },
    revalidate: hours(12)
  };
};

const IndexPage: FC<Props> = (props) => {
  const { videos, propaganda, dictators } = props;

  return (
    <>
      <SEO title="Tervetuloa" />
      <Layout>
        <ContentBox>
          <Box
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateAreas: [
                `
              "header"
              "fakeNews"
              "propagandaTube"
              "dictators"
              `,
                `
            "header header"
            "fakeNews propagandaTube"
            "dictators dictators"
            `
              ]
            }}
          >
            <Box
              as="section"
              sx={{
                gridArea: "header"
              }}
            >
              <SectionHeading>Puhemiehen tervehdys!</SectionHeading>

              <Paragraph>
                Tervetuloa Diktaattoripörssiin, kirjaimellisesti historialliseen
                verkkoteokseen jonka tekemiseen sinäkin voit osallistua. Minä
                olen <strong>Pekkis</strong>, ajatusten Vantaanakin tunnettu,
                Diktaattoripörssin elinikäinen varapresidentti ja kunnioitettu
                puhemies.
              </Paragraph>

              <Paragraph>
                Tietosanakirjaa lainatakseni: <strong>diktaattori</strong> (lat.
                dictator, sanelija) on henkilö, jolla on valtiossa rajaton
                hallintavalta usein vallananastuksen perusteella. Diktatuurille
                on ominaista poliittisen opposition tukahduttaminen sekä
                sananvapauden ja muiden perinteisten vapauksien rajoittaminen.
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

            <Box
              sx={{
                gridArea: "fakeNews"
              }}
            >
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
                  <Box my={2} key={item.sys.id} as="article">
                    <div>
                      <strong>
                        <time dateTime={date.toISODate()}>
                          {date.setLocale("fi").toLocaleString()}
                        </time>
                      </strong>
                    </div>
                    <InternalLink to={link}>{item.title}</InternalLink>
                  </Box>
                );
              })}

              <Box mt={3}>
                <InternalLink
                  to={url(
                    "newsIndex",
                    process.env.NEXT_PUBLIC_LOCALE as Locale
                  )()}
                >
                  <FaAngleDoubleRight sx={{ mr: 1 }} />
                  Lisää valeuutisia
                </InternalLink>
              </Box>
            </Box>

            <Box
              sx={{
                gridArea: "propagandaTube"
              }}
            >
              <Box>
                <SectionHeading>Propagandatuubi</SectionHeading>
                <PropagandaTube videos={videos} />
              </Box>
            </Box>

            <Box as="section" sx={{ gridArea: "dictators" }}>
              <SectionHeading>Viimeksi päivitetyt diktaattorit</SectionHeading>

              <DictatorGrid
                dictators={dictators}
                extraInfo={sortrados.updatedAt.ExtraInfo}
                fadeOutIf={() => true}
              />

              <Box
                mt={2}
                sx={{
                  fontSize: 3
                }}
              >
                <InternalLink
                  to={url(
                    "dictators",
                    process.env.NEXT_PUBLIC_LOCALE as Locale
                  )()}
                >
                  <FaAngleDoubleRight sx={{ mr: 1 }} />
                  Kaikki diktaattorit
                </InternalLink>
              </Box>
            </Box>
          </Box>
        </ContentBox>
      </Layout>
    </>
  );
};

export default IndexPage;
