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
        rounded-2xl
        p-4
        flex
        items-center
        gap-4
        cursor-pointer
        transition-all
        duration-300
        ease-out
        w-full
        min-w-50

        bg-white/10
        hover:bg-white/15
        hover:-translate-y-0.5
        hover:shadow-lg

        ${checked ? "ring-2 ring-primary bg-white/20 scale-[1.02]" : ""}
        focus-visible:ring-2
        focus-visible:ring-primary
      `}
    >
      {/* checkbox */}
      <div
        className={`
          w-5 h-5
          rounded-sm
          border-3
          border-white!
          flex
          items-center
          justify-center
          transition-all
          duration-200

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
            className="fill-primary scale-90"
            viewBox="0 -960 960 960"
            width="20"
            height="20"
          >
            <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
          </svg>
        )}
      </div>

      {/* value */}
      <div
        className={`
        text-[33px]
          transition-colors
          ${checked ? "text-white" : "text-white/80 group-hover:text-white"}
        `}
      >
        {value}
      </div>
    </div>
  );
}
