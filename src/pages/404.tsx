import Link from "next/link";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

export default function NotFound() {
  return (
    <Layout>
      <SEOHead title="Page not found" />
      <div className="max-w-8xl mx-auto px-4 pt-4 pb-12">
        <h1 className="text-3xl font-semibold my-8">Page not found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, that page doesn&apos;t exist. It may have moved or been removed.
        </p>
        <Link href="/" className="underline hover:text-gray-600 transition">
          Back to home
        </Link>
      </div>
    </Layout>
  );
}
