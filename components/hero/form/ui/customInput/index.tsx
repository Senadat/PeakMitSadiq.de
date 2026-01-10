import { useApp } from "@/context";
import { HeroFormData } from "@/types/hero";

export default function CustomInput({
  field,
  value,
}: {
  field: keyof HeroFormData;
  value: string;
}) {
  const { formData, updateFormField } = useApp();
  const checked = formData[field] === value;

  return (
    <div
      onClick={() => updateFormField(field, value)}
      role="button"
      tabIndex={0}
      className={`
        group
        w-full grow
        max-w-6xl

        flex items-center
        cursor-pointer

        rounded-xl sm:rounded-2xl
        px-3 sm:px-4 md:px-5 py-2
        gap-3 sm:gap-4 md:gap-5

        transition-all duration-300 ease-out

        bg-white/10
        hover:bg-white/15
        hover:-translate-y-0.5
        hover:shadow-lg

        ${checked ? "ring-2 ring-primary bg-[#D9D9D933] scale-[1.02]" : ""}

        focus-visible:ring-2
        focus-visible:ring-primary
      `}
    >
      {/* Checkbox */}
      <div
        className={`
          flex items-center justify-center
          rounded-sm

          w-4 h-4
          sm:w-5 sm:h-5
          md:w-6 md:h-6
          md:border-4
          border-3
          transition-all duration-200

          ${
            checked
              ? "border-primary bg-primary/10"
              : "border-[#FFFFFFE5] group-hover:border-primary"
          }
        `}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-primary w-3 h-3 sm:w-4 sm:h-4"
            viewBox="0 -960 960 960"
          >
            <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
          </svg>
        )}
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: "clamp(16px, 1.8vw, 33px)",
        }}
        className={`
          transition-colors
          text-base
          sm:text-lg
          md:text-xl
          lg:text-[33px]

          ${checked ? "text-white" : "text-[#B9B9B9] group-hover:text-white"}
        `}
      >
        {value}
      </div>
    </div>
  );
}
