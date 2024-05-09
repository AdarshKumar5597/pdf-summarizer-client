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
        <header className="m-8 ">
            <div className="flex items-center justify-between mx-auto my-4 max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
                <Link href="/">
                    <h1 className="text-2xl md:text-3xl font-bold"> Pdf <span className="text-blue-500">Summariser</span></h1>
                </Link>
                <nav className="gap-8 flex 2xl:ml-16 ">
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
                </nav>
                
            </div>
        </header>
    )
}