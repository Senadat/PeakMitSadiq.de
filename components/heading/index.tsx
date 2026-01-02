import Image from "next/image";

export default function SectionHeading({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className="
        relative w-fit mx-auto
        p-2 sm:p-3 lg:p-2
        mb-6 sm:mb-8 md:mb-10 lg:mb-20
      "
    >
      <h2
        className={`
    relative text-center
    font-semibold text-primary
    leading-[0.9]

    text-3xl         
    sm:text-5xl       
    md:text-6xl      
    lg:text-7xl       
    xl:text-[140px]  
    2xl:text-[200px] 

    ${className}
  `}
      >
        {children}
      </h2>

      {/* Decoration */}
      <div
        className="
          absolute
          top-2 sm:top-4 lg:top-8
          right-1 sm:right-2 lg:right-3

          w-24 h-8
          sm:w-40 sm:h-12
          lg:w-60 lg:h-20
        "
      >
        <Image alt="heading decoration" fill src="/heading-line.svg" priority />
      </div>
    </div>
  );
}
