/** @jsxImportSource theme-ui */

import { Box } from "theme-ui";
import Layout from "../../../components/layout/Layout";
import Paginator from "../../../components/Paginator";
import SEO from "../../../components/SEO";
import { FC } from "react";
import { GuestBookEntry } from "../../../types";
import SectionHeading from "../../../components/SectionHeading";
import { GetServerSideProps } from "next";
import axios from "axios";
import GuestbookEntry from "../../../components/GuestbookEntry";
import GuestbookFormWrapper from "../../../components/GuestbookForm";
import Paragraph from "../../../components/Paragraph";
import { useUserStore } from "../../../services/state";

const postsPerPage = 10;

type Props = {
  currentPage: number;
  numPages: number;
  posts: GuestBookEntry[];
};

type QueryParams = {
  page: string;
};

type Response = {
  totalPosts: number;
  posts: GuestBookEntry[];
};

export const getServerSideProps: GetServerSideProps<
  Props,
  QueryParams
> = async (context) => {
  const offset = (parseInt(context.params.page, 10) - 1) * 10;
  const ret = await axios.get<Response>(
    `${process.env.NEXT_PUBLIC_LOCAL_API}/guestbook?offset=${offset}&limit=10`
  );

  if (ret.data.posts.length === 0) {
    return {
      notFound: true
    };
  }

  const currentPage = parseInt(context.params.page as string, 10);
  const numPages = Math.ceil(ret.data.totalPosts / postsPerPage);

  return {
    props: {
      posts: ret.data.posts,
      currentPage,
      numPages
    }
  };
};

const NewsIndexPage: FC<Props> = (props) => {
  const { posts, currentPage, numPages } = props;

  const user = useUserStore((state) => state.user);

  return (
    <Layout>
      <SEO title="Valeuutiset" />
      <Box mx={2}>
        <Box mb={4}>
          <SectionHeading>Vieraskirja</SectionHeading>
          <Paragraph>
            Vieraskirja on konseptina reliikki ammoisilta ajoilta, mutta niin on
            Diktaattoripörssikin. Palauteketjumme on ainutlaatuinen katkeamaton
            ajatusten virta alkaen vuodesta 2002.
          </Paragraph>
          <Paragraph>
            Salvamiehen, pahanhengen Diktaattoripörssin sensuroimisen takana,
            palautteen löydät tilanteesta riippuen joko viimeiseltä tai
            viimeistä edelliseltä sivulta. Klassikkomatskua!
          </Paragraph>
        </Box>

        <Box my={4}>
          <GuestbookFormWrapper />
        </Box>

        <Box my={4}>
          <Paginator
            id="paginator-top"
            label="paginator-top"
            currentPage={currentPage}
            numPages={numPages}
            getLink="guestbookIndex"
          />
        </Box>

        <Box my={4}>
          {posts.map((entry) => (
            <GuestbookEntry user={user} key={entry.id} entry={entry} />
          ))}
        </Box>

        <Box mt={4}>
          <Paginator
            label="paginator-bottom"
            id="paginator-bottom"
            currentPage={currentPage}
            numPages={numPages}
            getLink="guestbookIndex"
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default NewsIndexPage;
