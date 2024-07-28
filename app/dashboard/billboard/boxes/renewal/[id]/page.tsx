"use client";
import { useGetBoxByIdQuery } from "@/app/apiSlices/boxesApiSlice";
import { BoxObject } from "@/app/lib/interfaces";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const [box, setBox] = useState<null | BoxObject | any>(null);

  const { data, isLoading, isFetching, refetch } = useGetBoxByIdQuery(
    id as string,
    {
      refetchOnMountOrArgChange: 5,
      refetchOnFocus: true,
    }
  );
  useEffect(() => {
    setBox(data?.entities[id as string]);
  }, [data]);
  console.log(box);

  return <div>{id}</div>;
};

export default page;
