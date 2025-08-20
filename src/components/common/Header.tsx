import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="flex items-center justify-between p-4 border-b"
      style={{
        backgroundColor: "var(--soft-white)",
        borderColor: "var(--warm-neutral)"
      }}
    >
      <Link href="/" className="flex items-center gap-2 hover:opacity-80">
        <Image
          src="/pinuc.png"
          alt="Pinuc"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <div
          className="text-xl sm:text-2xl font-bold"
          style={{ color: "var(--primary-blue)" }}
        >
          Pinuc
        </div>
      </Link>

      <div className="flex gap-2 sm:gap-4">
        <button
          className="px-3 py-2 text-sm sm:px-4 sm:text-base rounded hover:opacity-90"
          style={{
            color: "var(--primary-blue)",
            backgroundColor: "transparent"
          }}
        >
          Login
        </button>
        <button
          className="px-3 py-2 text-sm sm:px-4 sm:text-base text-white rounded hover:opacity-90"
          style={{ backgroundColor: "var(--primary-blue)" }}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}
