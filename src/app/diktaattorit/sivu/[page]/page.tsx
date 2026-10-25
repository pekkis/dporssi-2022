import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { range } from "ramda";
import { pageMetadata } from "@/services/metadata";
import { Box } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import Paginator from "@/components/Paginator";
import DictatorList from "@/components/dictator/DictatorList";
import { Dictator } from "@/types";
import SectionHeading from "@/components/SectionHeading";
import InternalLink from "@/components/InternalLink";
import { Locale, url } from "@/services/url";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import ContentBox from "@/components/layout/ContentBox";
import { pageParam } from "@/services/params";

const postsPerPage = 10;

type Params = { page: string };
type PageProps = { params: Promise<Params> };

const getPage = cache(async (page: string) => {
  const currentPage = pageParam({ page });
  if (!currentPage) {
    return undefined;
  }

  const query = gql`
    query DictatorIndexPage($locale: String!, $skip: Int!) {
      dictatorCollection(
        locale: $locale
        limit: 10
        skip: $skip
        where: { canonicalRanking_exists: true }
        order: [canonicalRanking_ASC]
      ) {
        total
        items {
          sys {
            id
          }
          canonicalRanking
          slug
          name
          country {
            name
            slug
            continent {
              name
              slug
            }
          }
          synopsis
          reignsCollection {
            items {
              start
              end
            }
          }
          primaryImage {
            url
            width
            height
            title
            description
          }
        }
      }
    }
  `;

  const res = await graphQLClient.request<{
    dictatorCollection: { total: number; items: Dictator[] };
  }>(query, { locale: "fi", skip: (currentPage - 1) * postsPerPage });

  const numPages = Math.ceil(res.dictatorCollection.total / postsPerPage);
  if (numPages < currentPage) {
    return undefined;
  }

  return { dictators: res.dictatorCollection.items, currentPage, numPages };
});

export async function generateStaticParams(): Promise<Params[]> {
  const query = gql`
    query DictatorPaths($locale: String!) {
      dictatorCollection(
        locale: $locale
        where: { canonicalRanking_exists: true }
      ) {
        items {
          slug
        }
      }
    }
  `;

  const res = await graphQLClient.request<{
    dictatorCollection: { items: { slug: string }[] };
  }>(query, { locale: "fi" });

  const numPages = Math.ceil(
    res.dictatorCollection.items.length / postsPerPage
  );
  return range(1, numPages + 1).map((p) => ({ page: String(p) }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { page } = await params;
  return pageMetadata({ title: "Pörssi", path: `/diktaattorit/sivu/${page}` });
}

export default async function Page({ params }: PageProps) {
  const data = await getPage((await params).page);
  if (!data) {
    notFound();
  }
  const { dictators, currentPage, numPages } = data;

  const title = "Pörssi";

  return (
    <ContentBox>
      <SectionHeading>{title}</SectionHeading>

      <p>
        Diktaattorien sijoitus Diktaattoripörssissä lasketaan salaisella, vain
        Puhemiehen ja hänen uskollisimpien kätyriensä tuntemalla kaavalla. Äänet
        lasketaan Venezuelan hallituksen lahjoittamilla luotettavilla
        Dominion&trade;-äänestyskoneilla.
      </p>

      <p>
        <InternalLink
          to={url("dictators", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
        >
          Diktaattorihausta
        </InternalLink>{" "}
        löydät kaikki diktaattorit, myös ne onnettomat jotka eivät vielä ole
        ehtineet saada rankingia.
      </p>

      <Box className={sprinkles({ my: 4 })}>
        <Paginator
          label="diktaattorien sivutus, ylempi"
          id="paginator-top"
          currentPage={currentPage}
          numPages={numPages}
          getLink="dictatorIndex"
        />
      </Box>

      <Box>
        <DictatorList dictators={dictators} showRanking />
      </Box>

      <Box className={sprinkles({ mt: 4 })}>
        <Paginator
          label="diktaattorien sivutus, alempi"
          id="paginator-top"
          currentPage={currentPage}
          numPages={numPages}
          getLink="dictatorIndex"
        />
      </Box>
    </ContentBox>
  );
}
