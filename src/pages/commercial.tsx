import { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import MasonryGallery from "@/components/MasonryGallery";
import { fetchImagesByFolder } from "@/lib/cloudinary";

export default function Commercial({ images }: { images: any[] }) {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold my-8">Commercial</h1>
        <MasonryGallery images={images} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const images = await fetchImagesByFolder("commercial");
  return {
    props: { images },
    revalidate: 60,
  };
};
