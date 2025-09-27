import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import MasonryGallery from '@/components/MasonryGallery';
import SEOHead from '@/components/SEOHead';
import { fetchImagesByFolder, CloudinaryImage } from '@/lib/cloudinary';

export const getStaticProps: GetStaticProps = async () => {
  const images = await fetchImagesByFolder('photography/weddings');
  return { props: { images }, revalidate: 60 };
};

export default function CategoryPage({ images }: { images: CloudinaryImage[] }) {
  return (
    <Layout>
      <SEOHead title="Weddings" description="Scott-Gobin Photography — Weddings portfolio" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold my-8">Weddings</h1>
        <MasonryGallery images={images} />
      </div>
    </Layout>
  );
}
