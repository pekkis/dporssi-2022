import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import NotFound from "@/components/errors/NotFound";

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="Sivua ei löytynyt" />
      <NotFound />
    </Layout>
  );
};

export default NotFoundPage;
