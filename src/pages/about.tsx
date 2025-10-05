import { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { getMarkdownPage } from "@/lib/markdown";

type Props = {
  frontmatter: {
    title: string;
    description?: string;
  };
  contentHtml: string;
};

export default function AboutPage({ frontmatter, contentHtml }: Props) {
  return (
    <Layout>
      <SEOHead title={frontmatter.title} description={frontmatter.description} />
      <div className="max-w-8xl mx-auto px-4">
        <article className="prose prose-lg max-w-none">
          {/* Heading styled same as gallery pages */}
          <h1 className="text-3xl font-semibold my-8">{frontmatter.title}</h1>

          {/* Inject Markdown content */}
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { frontmatter, contentHtml } = await getMarkdownPage("about");
  return {
    props: { frontmatter, contentHtml },
  };
};
