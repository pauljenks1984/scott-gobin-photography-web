import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "content", "about.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return { props: { frontmatter: data, content } };
}

export default function About({ frontmatter, content }: any) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">{frontmatter.title}</h1>
      <div className="prose max-w-3xl" dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
