"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeading from "../heading";
import sendIcon from "../../public/send.png";
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div>
        <SectionHeading>Kontaktiere mich</SectionHeading>

        <div
          className="w-full md:w-3/4 xl:w-2/4 mx-auto 
          flex flex-col lg:flex-row 
          justify-between items-center 
          my-20 gap-12 px-4"
        >
          {/* image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5]">
              <Image
                src="/about1.jpg"
                alt="contact form image"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>

          {/* form */}
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="p-3 w-full bg-[#3B3B3B] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 w-full bg-[#3B3B3B] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <textarea
                placeholder="Nachricht"
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-40 sm:h-48 p-4 resize-none bg-[#3B3B3B] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md text-white font-semibold transition flex items-center justify-center gap-2
                  ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#FF0303] hover:opacity-90"
                  }`}
              >
                {loading ? "Senden..." : "Senden"}
                <Image src={sendIcon} alt="send icon" className="w-8" />
              </button>

              {success && (
                <p className="text-green-500 text-sm text-center">
                  Nachricht erfolgreich gesendet!
                </p>
              )}

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
