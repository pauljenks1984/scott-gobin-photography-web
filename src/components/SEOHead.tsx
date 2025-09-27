import Head from 'next/head';
import React from 'react';

export default function SEOHead({ title, description, image }: { title?: string; description?: string; image?: string }) {
  const siteTitle = title ? `${title} | Scott-Gobin Photography` : 'Scott-Gobin Photography';
  const desc = description || 'Photography portfolio';
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={siteTitle} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:description" content={desc} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
