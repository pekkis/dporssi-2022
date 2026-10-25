import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { range } from "ramda";
import { pageMetadata } from "@/services/metadata";
import { Box } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import Paginator from "@/components/Paginator";
import { FakeNewsItem } from "@/types";
import SectionHeading from "@/components/SectionHeading";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import PropagandaLight from "@/components/PropagandaLight";
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
    query NewsIndexPage($locale: String!, $skip: Int!) {
      propagandaCollection(
        locale: $locale
        limit: 10
        skip: $skip
        order: [date_DESC]
      ) {
        total
        items {
          sys {
            id
          }
          date
          slug
          title
          description
        }
      }
    }
  `;

  const res = await graphQLClient.request<{
    propagandaCollection: { total: number; items: FakeNewsItem[] };
  }>(query, { locale: "fi", skip: (currentPage - 1) * postsPerPage });

  const numPages = Math.ceil(res.propagandaCollection.total / postsPerPage);
  if (numPages < currentPage) {
    return undefined;
  }

  return { fakeNews: res.propagandaCollection.items, currentPage, numPages };
});

export async function generateStaticParams(): Promise<Params[]> {
  // The first page is built ahead; the rest on first request, as before.
  return range(1, 2).map((p) => ({ page: String(p) }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { page } = await params;
  return pageMetadata({
    title: "Valeuutiset",
    path: `/valeuutiset/sivu/${page}`
  });
}

export default async function Page({ params }: PageProps) {
  const data = await getPage((await params).page);
  if (!data) {
    notFound();
  }
  const { fakeNews, currentPage, numPages } = data;

  return (
    <ContentBox>
      <Box>
        <Box className={sprinkles({ mb: 4 })}>
          <SectionHeading>Valeuutiset</SectionHeading>

          <p>
            Kaikki, mitä puhemies Pekkis sanoo, on automaattisesti totta. Niin
            sanotaan Huotilistisessa manifestissa, pyhistä kirjoista pyhimmässä,
            jonka puhemiehemme on meille jaloudessaan osoittanut!
          </p>
        </Box>

        <Box className={sprinkles({ my: 4 })}>
          <Paginator
            id="paginator-top"
            label="paginator-top"
            currentPage={currentPage}
            numPages={numPages}
            getLink="newsIndex"
          />
        </Box>
      </Box>
      {fakeNews.map((p) => (
        <PropagandaLight key={p.sys.id} propaganda={p} />
      ))}

      <Box className={sprinkles({ mt: 4 })}>
        <Paginator
          label="paginator-bottom"
          id="paginator-bottom"
          currentPage={currentPage}
          numPages={numPages}
          getLink="newsIndex"
        />
      </Box>
    </ContentBox>
  );
}
