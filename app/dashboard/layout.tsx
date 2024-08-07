"use client";
import {
  useRefreshMutation,
  useSendLogoutMutation,
} from "../apiSlices/authApiSlice";
import { selectCurrentToken, setCredentials } from "../apiSlices/authSlice";
import { menuItems } from "../lib/constants";
import { useEffect, useRef, useState } from "react";
import Header from "../features/header/Header";
import Footer from "../features/footer/Footer";
import Menu from "../features/sidemenu/Menu";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../config/roles";
import useAuth from "../hooks/useAuth";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SocketProvider } from "../config/state-config/SocketContext";

const Loading = dynamic(() => import("../features/loading/Loading"), {
  ssr: false,
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { roles } = useAuth();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef<boolean>(false);
  const [trueSuccess, setTrueSuccess] = useState<boolean>(false);
  const { push } = useRouter();
  const [sendLogout] = useSendLogoutMutation();

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh(undefined);
        setTrueSuccess(true);
      } catch (error: any) {
        console.log("error", error);
        if (error.status == 403 || error.status === "FETCH_ERROR") {
          await sendLogout(undefined);
          push("/");
        }
      }
    };
    if (!token) verifyRefreshToken();
    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line
  }, [trueSuccess]);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("CC_Token") : null;

  useEffect(() => {
    if (!accessToken) {
      push("/");
    }
  }, [accessToken, push]);

  let content;

  if (roles.some((role: string) => Object.values(ROLES).includes(role))) {
    if (isLoading) {
      content = <Loading />;
    } else if (isError) {
      content = (
        <p>
          <Link href={"/"}>دوباره وارد شوید</Link>
        </p>
      );
    } else if (isSuccess && trueSuccess) {
      content = children;
    } else if (token && isUninitialized) {
      content = children;
    } else {
      content = <Loading />;
    }
  } else {
    content = (
      <p>
        <Link href={"/"}>دوباره وارد شوید</Link>
      </p>
    );
  }

  return (
    <SocketProvider>
      <div className="p-4 md:p-8">
        <Header />
        <div className="flex flex-col xl:flex-row gap-8">
          <Menu menuItems={menuItems} />
          <div className="xl:w-[calc(100%-300px)] w-full flex flex-col">
            {content}
          </div>
        </div>
        <Footer />
      </div>
    </SocketProvider>
  );
};

export default MainLayout;
