import Image from "next/image";

export default function SectionHeading({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className="relative w-fit p-2 mb-8 md:mb-10 lg:mb-12 mx-auto">
      <h2
        className={`relative text-center border text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight ${className}`}
      >
        {children}
      </h2>
      <div className="absolute top-0 right-3 ">
        <Image
          alt="heading decoration"
          width={100}
          height={60}
          src="/heading-line.svg"
          className=""
        />
      </div>
    </div>
  );
}
