"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const links = [
    { name: 'Home', href: '/' },
    { name: 'Nav1', href: '/Nav1' },
    { name: 'Nav2', href: '/Nav2' },
    { name: 'Nav3', href: '/Nav3' },
]

export default function Navbar() {

    const pathname = usePathname();
    return (
        <header className="m-4 ">
            <div className="flex items-center justify-between max-w-full px-4 sm:px-6 ">
                <Link href="/">
                    <h1 className="text-2xl md:text-3xl font-bold"> Pdf <span className="text-blue-500">Summariser</span></h1>
                </Link>
                <nav className="gap-6 flex justify-center items-center">
                    {links.map((link, index) => (
                        <div key={index}>
                            {pathname === link.href ? (
                                <Link href={link.href} className="text-lg font-semibold text-blue-300">
                                    {link.name}
                                </Link>
                            ) : (
                                <Link href={link.href} className="text-lg font-semibold text-gray-200 transition duration-100 hover:text-primary">
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                    <div>
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Login</button>
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Sign Up</button>
                    </div>
                </nav>

            </div>
        </header>
    )
}