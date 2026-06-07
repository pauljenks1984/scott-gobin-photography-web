import { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { getMarkdownPage } from "@/lib/markdown";
import { cloudinaryUrl } from "@/lib/cloudinary";

const HEADSHOT_URL =
  "https://res.cloudinary.com/drwunvtki/image/upload/about/scott-headshot.webp";

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
      <div className="max-w-8xl mx-auto px-4 pt-4">
        <h1 className="text-3xl font-semibold my-8">{frontmatter.title}</h1>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <article className="prose prose-lg max-w-none flex-1">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </article>
          <div className="w-full md:w-72 shrink-0">
            <img
              src={cloudinaryUrl(HEADSHOT_URL, "f_auto,q_auto,w_576,c_fill,g_face")}
              alt="Scott Gobin – photographer"
              className="w-full rounded"
            />
          </div>
        </div>
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
