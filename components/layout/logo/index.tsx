import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="w-36.25 h-33.75 scale-75 relative border">
      <Image src={"/logo.svg"} alt="logo" fill />
    </Link>
  );
}
