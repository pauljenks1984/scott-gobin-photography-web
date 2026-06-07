import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await fetch("/netlify-forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", name, email, message }),
      });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <SEOHead title="Contact" description="Get in touch with Scott-Gobin, professional photographer based in Liverpool, Merseyside." />
      <div className="max-w-8xl mx-auto px-4 pt-4 pb-12">
        <h1 className="text-3xl font-semibold my-8">Get in touch</h1>

        {status === "success" ? (
          <p className="text-gray-700">
            Thank you — your message has been sent. I&apos;ll be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-5 max-w-lg"
          >
            {/* Required by Netlify Forms for AJAX submission */}
            <input type="hidden" name="form-name" value="contact" />
            {/* Honeypot — hidden from real users, bots fill it in */}
            <p className="hidden">
              <label>
                Don&apos;t fill this in: <input name="bot-field" />
              </label>
            </p>

            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-red-600 text-sm">
                Something went wrong — please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="self-start bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50 transition"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
