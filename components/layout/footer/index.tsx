import { navOptions } from "@/lib/data/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    {
      title: "facebook",
      icon: <Image src={"/facebook.svg"} alt="facebook icon" fill />,
      link: `https://www.facebook.com/share/1C663Q2U2t/?mibextid=wwXIfr`,
    },
    {
      title: "instagram",
      icon: <Image src={"/instagram.svg"} alt="instagram icon" fill />,
      link: `https://www.instagram.com/sadiq.aj/`,
    },
    // {
    //   title: "whatsapp",
    //   icon: <Image src={"/whatsapp.svg"} alt="whatsapp icon" fill />,
    //   link: `https://api.whatsapp.com/send?phone=4915734693269`,
    // },
    // {
    //   title: "x",
    //   icon: <Image src={"/twitter.svg"} alt="x icon" fill />,
    //   link: `#`,
    // },
    {
      title: "tiktok",
      icon: <Image src={"/tiktok.svg"} alt="tiktok icon" fill />,
      link: `https://www.tiktok.com/@peakmitsadiq?_r=1&_t=ZG-93fk6pAiWLh`,
    },
  ];

  return (
    <footer className="w-full ">
      {/* Main Footer Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col items-center gap-8 md:gap-10">
            {/* Logo */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40">
              <Image
                src={"/logo.svg"}
                alt="PeakMitSadiq logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Navigation Links */}
            <nav className="w-full">
              <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-center">
                {navOptions.map((option) => (
                  <li key={option.href}>
                    <Link
                      href={option.href}
                      className="text-gray-300 hover:text-primary text-sm sm:text-base font-medium transition-colors duration-300 hover:underline underline-offset-4"
                    >
                      {option.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4 sm:gap-6">
              {socials.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 sm:w-12 sm:h-12 hover:scale-110 transition-transform duration-300 ease-in-out group"
                  aria-label={item.title}
                >
                  <div className="w-full h-full rounded-full bg-white/10 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                      {item.icon}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Copyright */}
            <p className="text-sm text-center md:text-left">
              © {currentYear} PeakMitSadiq. Alle Rechte vorbehalten.
            </p>

            {/* Legal Links */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm">
              <Link
                href={"/legal"}
                className="hover:text-primary transition-colors duration-300 hover:underline underline-offset-2"
              >
                Impressum
              </Link>
              <div className="hidden sm:block w-px h-4 bg-gray-300" />
              <p className="text-center">
                Website erstellt von{" "}
                <a
                  href="https://senadat.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  Senadat
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
