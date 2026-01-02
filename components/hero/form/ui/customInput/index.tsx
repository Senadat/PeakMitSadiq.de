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
        p-3 sm:p-4 md:p-5
        gap-3 sm:gap-4 md:gap-5

        transition-all duration-300 ease-out

        bg-white/10
        hover:bg-white/15
        hover:-translate-y-0.5
        hover:shadow-lg

        ${checked ? "ring-2 ring-primary bg-white/20 scale-[1.02]" : ""}

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

          border-2
          transition-all duration-200

          ${
            checked
              ? "border-primary bg-primary/10"
              : "border-white/40 group-hover:border-primary"
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
        className={`
          transition-colors
          text-base
          sm:text-lg
          md:text-xl
          lg:text-[33px]

          ${checked ? "text-white" : "text-white/80 group-hover:text-white"}
        `}
      >
        {value}
      </div>
    </div>
  );
}
