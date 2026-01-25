import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/#hero"}
      className="w-36.25 h-33.75 scale-50 md:scale-75 relative"
    >
      <Image src={"/logo.svg"} alt="logo" fill />
    </Link>
  );
}
