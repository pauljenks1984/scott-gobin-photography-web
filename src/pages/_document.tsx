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
