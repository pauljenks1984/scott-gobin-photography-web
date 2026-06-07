// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Google Fonts: Playfair Display */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Scott Gobin Photography",
            "description": "Professional photographer based in Liverpool, UK, specialising in commercial, fashion, portrait and property photography across Merseyside and the North West.",
            "url": "https://scottgobinphotography.com",
            "image": "https://scottgobinphotography.com/scott-gobin-photography.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Liverpool",
              "addressRegion": "Merseyside",
              "addressCountry": "GB"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 53.4084,
              "longitude": -2.9916
            },
            "areaServed": ["Liverpool", "Merseyside", "North West England"],
            "knowsAbout": ["Commercial Photography", "Fashion Photography", "Portrait Photography", "Property Photography", "Drone Photography"]
          })}}
        />
      </Head>
      <body>
        {/* Hidden form so Netlify detects it at build time */}
        <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input name="bot-field" />
          <input name="name" />
          <input name="email" />
          <textarea name="message"></textarea>
        </form>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
