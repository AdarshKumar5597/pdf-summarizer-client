"use client";
import { LogoutUser } from "@/redux/slices/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const links = [
  { name: "Home", href: "/" },
  { name: "summarizer", href: "/feature/summarizer" },
  { name: "friends", href: "/feature/friends" },
  { name: "PDFs", href: "/summarizedpdfs" },
  { name: "Chatbot", href: "/chatbot" },
];

export default function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const pathname = usePathname();
  
  return (
    <header className={`m-4 ${!isLoggedIn && "hidden"}`}>
      <div className="flex items-center justify-between max-w-full px-4 sm:px-6 ">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-bold">
            {" "}
            Pdf <span className="text-blue-500">Summariser</span>
          </h1>
        </Link>
        <nav className="gap-6 flex justify-center items-center">
          {links.map((link, index) => (
            <div key={index}>
              {pathname === link.href ? (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-blue-300"
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-200 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => dispatch(LogoutUser())}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              Logout
            </button>
          ) : (
            <div>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                <Link href="/auth/login">Login</Link>
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                <Link href="/auth/register">Sign Up</Link>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
