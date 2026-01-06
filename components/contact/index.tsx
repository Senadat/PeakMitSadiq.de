"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeading from "../heading";
import FormInput from "../input";

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
        <SectionHeading showDecoration={false}>Kontaktiere mich</SectionHeading>

        <div
          className="w-full md:w-3/4 xl:w-2/4 mx-auto 
          flex flex-col lg:flex-row 
          justify-between items-center lg:items-stretch 
          my-20 gap-12 px-4"
        >
          {/* image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full lg:h-full max-w-md aspect-4/5">
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
              {/* Name */}
              <FormInput
                className="rounded-none!"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="#B9B9B9"
                  >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                  </svg>
                }
                placeholder="Name"
                value={name}
                onChange={setName}
                required
              />

              {/* Email */}
              <FormInput
                type="email"
                className="rounded-none!"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="#B9B9B9"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Z" />
                  </svg>
                }
                placeholder="Email"
                value={email}
                onChange={setEmail}
                required
              />

              {/* Message (textarea with icon) */}
              <div className="relative">
                <div className="flex items-start gap-3 px-4 py-3 rounded-none bg-[#3B3B3B] focus-within:ring-2 focus-within:ring-primary/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="#B9B9B9"
                    className="mt-1 shrink-0"
                  >
                    <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z" />
                  </svg>

                  <textarea
                    placeholder="Nachricht"
                    value={message}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 h-40 sm:h-48 resize-none bg-transparent text-white placeholder:text-[#FFFFFFB2] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 flex items-center justify-center gap-2 rounded-none text-white font-semibold transition
                  ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#FF0303] hover:opacity-90"
                  }`}
              >
                {loading ? "Senden..." : "Nachricht senden"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                </svg>
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
