import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/services/metadata";
import { getGuestbookPosts } from "@/services/guestbook-posts";
import GuestbookEntries from "@/components/GuestbookEntries";
import { Box } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import Paginator from "@/components/Paginator";
import SectionHeading from "@/components/SectionHeading";
import GuestbookFormWrapper from "@/components/GuestbookForm";
import Paragraph from "@/components/Paragraph";
import ContentBox from "@/components/layout/ContentBox";
import { pageParam } from "@/services/params";

// Fetched on every request, as before (getServerSideProps).
export const dynamic = "force-dynamic";

const postsPerPage = 10;

type PageProps = { params: Promise<{ page: string }> };

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { page } = await params;
  return pageMetadata({
    title: "Vieraskirja",
    path: `/vieraskirja/sivu/${page}`
  });
}

export default async function GuestbookPage({ params }: PageProps) {
  const currentPage = pageParam(await params);
  if (!currentPage) {
    notFound();
  }

  const { posts, totalPosts } = await getGuestbookPosts(
    (currentPage - 1) * postsPerPage,
    postsPerPage
  );
  if (posts.length === 0) {
    notFound();
  }

  const numPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <ContentBox>
      <Box className={sprinkles({ mb: 4 })}>
        <SectionHeading>Vieraskirja</SectionHeading>
        <Paragraph>
          Vieraskirja on konseptina reliikki ammoisilta ajoilta, mutta niin on
          Diktaattoripörssikin. Palauteketjumme on ainutlaatuinen katkeamaton
          ajatusten virta alkaen vuodesta 2002.
        </Paragraph>
        <Paragraph>
          Salvamiehen, pahanhengen Diktaattoripörssin sensuroimisen takana,
          palautteen löydät tilanteesta riippuen joko viimeiseltä tai viimeistä
          edelliseltä sivulta. Klassikkomatskua!
        </Paragraph>
      </Box>

      <Box className={sprinkles({ my: 4 })}>
        <GuestbookFormWrapper />
      </Box>

      <Box className={sprinkles({ my: 4 })}>
        <Paginator
          id="paginator-top"
          label="paginator-top"
          currentPage={currentPage}
          numPages={numPages}
          getLink="guestbookIndex"
        />
      </Box>

      <Box className={sprinkles({ my: 4 })}>
        <GuestbookEntries posts={posts} />
      </Box>

      <Box className={sprinkles({ mt: 4 })}>
        <Paginator
          label="paginator-bottom"
          id="paginator-bottom"
          currentPage={currentPage}
          numPages={numPages}
          getLink="guestbookIndex"
        />
      </Box>
    </ContentBox>
  );
}
