import { useApp } from "@/context";
import styles from "../section.module.css";
import { useState } from "react";
import { SheetsPayload } from "@/types/sheets";
import Spinner from "@/components/loader";
import Image from "next/image";
import { motion } from "framer-motion";
import { scrollToId } from "@/lib/utils/scrollToId";

type EmailInputProps = {
  onSubmit: (email: string) => Promise<void>;
  loading?: boolean;
  error?: string;
};

export default function EmailForm() {
  const {
    setShowRecommendation,
    formData,
    setHasCompletedForm,
    sendingEmail,
    setSendingEmail,
  } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (email: string) => {
    if (loading) return;
    setLoading(true);
    setSendingEmail(true);
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const payload: SheetsPayload = {
      name: "Gast",
      email,
      phone: null,
      address: null,
      available_dates: null,
      package_name: null,
      package_price: null,
      session_duration: null,
      message: null,
      goal: formData.a ?? null,
      gender: formData.b ?? null,
      age: formData.c ?? null,
      commitment: formData.d ?? null,
    };

    try {
      if (!emailRegex.test(email)) {
        throw new Error("Bitte eine gültige E-Mail-Adresse eingeben");
      }
      //   Avoiding runtime errors for long api call
      try {
        await fetch("/api/saveForm", {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            ...payload,
            token: process.env.NEXT_PUBLIC_FORM_TOKEN,
          }),
        });
      } catch (e: any) {
        console.error(e);
      }
      //   Avoiding runtime errors for long api call

      setLoading(false);
      setSendingEmail(false);
      setHasCompletedForm(true);
      setShowRecommendation(true);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong. Please try again.");
      setLoading(false);
      setSendingEmail(false);
    }
  };

  return (
    <div className={`${styles.parent}`}>
      {/* Heading */}
      <p className={`${styles.heading}`}>
        {loading
          ? "Danke für dein Vertrauen! Deine persönliche Empfehlung wird vorbereitet"
          : "Auf Basis deiner Antworten formuliere ich jetzt meine erste Trainingsempfehlung für dich. Ich brauche deine E-Mail, damit ich dir eine tiefere Beratung anbieten kann."}
      </p>

      {/* Options */}
      {loading ? (
        <div className="flex gap-2 items-center justify-center w-full">
          <div className=" flex-none">
            <Spinner />
          </div>
          <p className="text-[#B9B9B9] flex-none md:text-xl text-wrap">
            Ich bereite gerade deine erste Trainingsempfehlung vor…
          </p>
        </div>
      ) : (
        <div className={`flex flex-col gap-2`}>
          <EmailInput onSubmit={handleSubmit} error={error} />
          {error && <p className={`${styles.notice} text-red-500!`}>{error}</p>}
          <p className={`${styles.notice}`}>
            Kein Spam. Deine Daten werden ausschließlich für dein Training und
            hilfreiche Infos genutzt.
          </p>
        </div>
      )}
    </div>
  );
}

function EmailInput({ onSubmit }: EmailInputProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubmit(email.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-2xl bg-[#D9D9D933] border px-3 py-1 focus-within:ring-2 focus-within:ring-brand-primary"
    >
      {/* Mail icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="45px"
        viewBox="0 -960 960 960"
        width="35px"
        fill="#B9B9B9"
        className="w-10 h-7.5  md:w-11.25 md:h-8.75"
      >
        <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
      </svg>

      {/* Input */}
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
        placeholder="Deine E-Mail-Adresse"
        className="flex-1 bg-transparent  md:text-lg lg:text-xl text-white outline-none  placeholder:text-[#B9B9B9]"
      />
      {/* Submit button */}
      <button
        type="submit"
        className="rounded-lg p-2 mb-2 text-foreground-secondary transition hover:bg-card-hover hover:text-foreground disabled:opacity-50"
        aria-label="Submit email"
      >
        <motion.span className="flex items-center relative justify-center w-8 h-8 leading-0">
          <Image src={"/send-icon.svg"} fill alt="send icon" />
        </motion.span>
      </button>
    </form>
  );
}
