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
        className={`relative text-center border text-primary text-[200px] font-semibold leading-50 ${className}`}
      >
        {children}
      </h2>
      <div className="absolute top-8 right-3 w-60 h-20 ">
        <Image
          alt="heading decoration"
          fill
          src="/heading-line.svg"
          className=""
        />
      </div>
    </div>
  );
}
