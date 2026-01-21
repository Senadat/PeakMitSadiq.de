import { ReactNode, useState } from "react";
import styles from "../section.module.css";
import { useApp } from "@/context";
import { SheetsPayload } from "@/types/sheets";

export default function ContactForm() {
  type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const { formData, setHasCompletedForm } = useApp();

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name ist erforderlich";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name muss mindestens 2 Zeichen haben";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Bitte eine gültige E-Mail-Adresse eingeben";
    }

    if (!message.trim()) {
      newErrors.message = "Nachricht ist erforderlich";
    } else if (message.trim().length < 10) {
      newErrors.message = "Nachricht muss mindestens 10 Zeichen haben";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    const payload: SheetsPayload = {
      name,
      email,
      phone: null,
      address: null,
      available_dates: null,
      package_name: null,
      package_price: null,
      session_duration: null,
      message,
      goal: formData.a ?? null,
      gender: formData.b ?? null,
      age: formData.c ?? null,
      commitment: formData.d ?? null,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          isBooking: false,
          payload,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      setHasCompletedForm(true);

      try {
        await fetch("/api/saveForm", {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            ...payload,
            token: process.env.NEXT_PUBLIC_FORM_TOKEN,
          }),
        });
      } catch (e) {
        console.error(e);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`${styles.parent} w-full  flex-none`}>
      {/* Heading */}
      <div className="flex-col justify-center gap-4">
        <p className={`${styles.heading}`}>
          Alles gut! Lass uns erst sprechen.
        </p>

        <p className={`${styles.notice}`}>
          Schreib mir kurz. Je besser ich deine Situation verstehe, desto besser
          kann ich dich unterstützen.
        </p>
      </div>

      <div className={``}>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row  w-full  items-stretch sm:items-start gap-4 sm:gap-4">
            <div className="w-full sm:w-[calc(50%-8px)]">
              {/* Name */}
              <FormInput
                placeholder="Name"
                value={name}
                onChange={setName}
                required
                className=""
              />
              {errors.name && (
                <p className="text-red-500 text-wrap text-xs md:text-sm">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="w-full sm:w-[calc(50%-8px)]">
              {/* Email */}
              <FormInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={setEmail}
                required
                className=""
              />
              {errors.email && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="relative">
            <div className="flex items-start gap-3 px-4 py-4 bg-[#D9D9D933] rounded-2xl border">
              <textarea
                placeholder="Ich bin noch nicht bereit, weil..."
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 h-40 sm:h-48 resize-none bg-transparent 
                                             text-base md:text-lg 
                                             text-white placeholder:text-[#FFFFFFB2] outline-none"
              />
            </div>
            {errors.message && (
              <p className="text-red-500 text-sm md:text-base mt-2">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-2xl text-base md:text-lg lg:text-xl
                                flex items-center justify-center gap-2 
                                text-white  transition
                                ${
                                  loading
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-primary hover:opacity-90"
                                }`}
          >
            {loading ? "Senden..." : "Versenden & mehr erfahren"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
              className="stroke-white"
            >
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
          </button>

          {success && (
            <p className="text-green-500 text-base md:text-lg text-center">
              Nachricht erfolgreich gesendet!
            </p>
          )}

          {error && (
            <p className="text-red-500 text-base md:text-lg text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

interface FormInputProps {
  icon?: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: "text" | "email" | "tel" | "password";
  error?: string;
  required?: boolean;
  className?: string;
}

function FormInput({
  icon,
  placeholder,
  value,
  onChange,
  onBlur,
  type = "text",
  error,
  required = false,
  className = "",
}: FormInputProps) {
  return (
    <div className={`relative mb-1 ${className}  w-full`}>
      <div
        className={`flex items-center gap-3 px-4 text-white bg-[#D9D9D933] border py-3 rounded-2xl transition-all ${
          error
            ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200"
            : "border-gray-300  focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary"
        } `}
      >
        {icon && <div className="shrink-0">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required={required}
          className="flex-1 outline-none text-white placeholder:text-[#FFFFFFB2]"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 -960 960 960"
            width="16"
            fill="currentColor"
          >
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
