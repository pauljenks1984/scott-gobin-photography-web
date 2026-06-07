import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE_URL = 'https://scottgobinphotography.com';
const DEFAULT_DESC = 'Professional photographer based in Liverpool. Commercial, fashion, portrait and property photography across Merseyside and the North West.';

export default function SEOHead({ title, description, image }: { title?: string; description?: string; image?: string }) {
  const router = useRouter();
  const siteTitle = title
    ? `${title} | Scott-Gobin Photography`
    : 'Scott-Gobin Photography | Liverpool Photographer';
  const desc = description || DEFAULT_DESC;
  const canonical = `${SITE_URL}${router.pathname === '/' ? '' : router.pathname}`;
  const ogImage = image || `${SITE_URL}/scott-gobin-photography.png`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Scott-Gobin Photography" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
