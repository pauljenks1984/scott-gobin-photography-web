import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import "yet-another-react-lightbox/styles.css";
import "@/styles/nav.css"; 

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
