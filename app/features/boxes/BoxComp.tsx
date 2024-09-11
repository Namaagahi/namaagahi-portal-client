"use client";
import { useGetAllBoxesQuery } from "@/app/apiSlices/boxesApiSlice";
import Button from "@/app/components/main/Button";
import PageTitle from "@/app/components/main/PageTitle";
import SearchContainer from "@/app/components/main/SearchContainer";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const BoxItem = dynamic(() => import("@/app/features/boxes/BoxItem"), {
  ssr: false,
});
const Loading = dynamic(() => import("@/app/features/loading/Loading"), {
  ssr: false,
});

type Props = {
  page: string;
  archived?: Boolean;
};

const BoxComp = (props: Props) => {
  const { page, archived } = props;
  const { push } = useRouter();
  const [boxes1, setBoxes1] = useState<any[]>([]);

  const {
    data: boxes,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllBoxesQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  useEffect(() => {
    if (isSuccess && Array.isArray(boxes)) {
      setBoxes1(boxes);
    } else {
      fetch(`${process.env.SERVER}/boxes`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setBoxes1(data);
          } else {
            console.error("Expected an array but got:", data);
            setBoxes1([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching boxes:", error);
          setBoxes1([]);
        });
    }
  }, [boxes, isSuccess]);

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-3">
        <p className="text-xl">هیچ باکسی وجود ندارد</p>

        <p>
          برای ایجاد باکس جدید
          <Link href={"/dashboard/billboard/boxes/createbox"}>
            <span className="text-cyan-300">کلیک کنید</span>
          </Link>
        </p>
      </div>
    );

  const boxItemsContent =
    boxes1?.length && !archived
      ? boxes1
          .filter((x) => !x.isArchived)
          .map((x: any, index: number) => (
            <BoxItem key={x._id} boxId={x._id} index={index} page={page} />
          ))
      : boxes1
          .filter((x) => x.isArchived)
          .map((x: any, index: number) => (
            <BoxItem key={x._id} boxId={x._id} index={index} page={page} />
          ));

  return (
    <main className="min-h-screen">
      <PageTitle name={`${archived ? "باکس های آرشیو شده" : "باکس ها"}`} />

      <div className="flex items-center justify-between gap-3">
        <SearchContainer />
        {/* {!archived && (
          <Button
            onClickHandler={() => push("/dashboard/billboard/boxes/createbox")}
            title="باکس جدید"
          />
        )} */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {boxItemsContent}
      </div>
    </main>
  );
};

export default BoxComp;
