"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const Login = dynamic(() => import("./features/login/Login"), { ssr: false });

export default function Home() {
  const { push } = useRouter();
  const accessToken =
    typeof window !== "undefined" && window.localStorage.getItem("CC_Token");
  if (accessToken) push("/dashboard");
  return <>({!accessToken && <Login />})</>;
}
