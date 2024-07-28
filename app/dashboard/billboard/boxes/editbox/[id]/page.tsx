"use client";
import { useGetBoxByIdQuery } from "@/app/apiSlices/boxesApiSlice";
import ScrollContainer from "@/app/components/main/ScrollContainer";
import EditBoxComp from "@/app/features/boxes/EditBoxComp";
import Loading from "@/app/features/loading/Loading";
import usePageTitle from "@/app/hooks/usePageTitle";
import { BoxObject } from "@/app/lib/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditBox = () => {
  usePageTitle("ویرایش باکس");

  const { id } = useParams();
  const [box, setBox] = useState<null | BoxObject>(null);
  const { data, isLoading, isFetching, refetch } = useGetBoxByIdQuery(
    id as string,
    {
      refetchOnMountOrArgChange: 5,
      // refetchOnFocus: true
    }
  );
  console.log(data);

  const abc = localStorage.getItem("editBoxForm");
  useEffect(() => {
    if (data) {
      localStorage.getItem("editBoxForm")
        ? setBox({
            ...JSON.parse(localStorage.getItem("editBoxForm") as string),
            ...JSON.parse(
              JSON.stringify(data?.entities[id as string] as BoxObject)
            ),
          })
        : setBox(
            JSON.parse(
              JSON.stringify(data?.entities[id as string] as BoxObject)
            )
          );
    }
  }, [data, refetch]);

  if (isLoading || isFetching || !box) return <Loading />;
  return (
    <>
      <EditBoxComp box={box} key={box.version} />
      <ScrollContainer />
    </>
  );
};

export default EditBox;
