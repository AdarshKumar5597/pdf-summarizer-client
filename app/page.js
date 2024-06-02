"use client"
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
    if (isLoggedIn === false) {
        return (
            router.replace("/auth/login")
        )
    }
  return (
    <div className="overflow-hidden">
      <Dashboard/>
    </div>
  );
}
