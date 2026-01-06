import { ReactNode } from "react";

interface FormInputProps {
  icon: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: "text" | "email" | "tel" | "password";
  error?: string;
  required?: boolean;
  className?: string;
}

export default function FormInput({
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
    <div className={`relative `}>
      <div
        className={`flex items-center gap-3 px-4 text-white py-3  ${className} rounded-full transition-all ${
          error
            ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200"
            : "border-gray-300 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary"
        } bg-[#3B3B3B]`}
      >
        <div className="shrink-0">{icon}</div>
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
