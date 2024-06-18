import { selectBoxById } from "../../apiSlices/boxesApiSlice";
import { BoxObject, UserObject } from "@/app/lib/interfaces";
import useAuth from "@/app/hooks/useAuth";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { selectAllUsers } from "@/app/apiSlices/usersApiSlice";

const ListItem = dynamic(() => import("@/app/components/main/ListItem"), {
  ssr: false,
});

type Props = {
  boxId: string;
  index: number;
  page: string;
};

const BoxItem = ({ boxId, index, page }: Props) => {
  const { id } = useAuth();

  const box: BoxObject = useSelector(
    (state: any) => selectBoxById(state, boxId) as BoxObject
  );

  const allUsers: UserObject[] = useSelector(
    (state: any) => selectAllUsers(state) as UserObject[]
  );

  const user = allUsers.find((user) => user.username === box?.username);

  if (!box) {
    return <div>Box not found</div>;
  }

  const titles = {
    "نام باکس": box.name,
    "نوع باکس": box.mark.name,
    "کد پروژه": box.mark.markOptions?.projectNumber,
    برند: box.mark.markOptions?.brand,
  };

  if (page === "my" && box.userId === id) {
    return (
      <ListItem
        number={index}
        param={boxId}
        prop={box}
        startDate={box.duration?.startDate}
        endDate={box.duration?.endDate}
        diff={box.duration?.diff}
        titles={{ ...titles, "کاربر ایجاد کننده": box.username }}
      />
    );
  }

  return (
    <ListItem
      number={index}
      param={boxId}
      prop={box}
      startDate={box.duration?.startDate}
      endDate={box.duration?.endDate}
      diff={box.duration?.diff}
      titles={{ ...titles, "کاربر ایجاد کننده": user?.name }}
    />
  );
};

export default BoxItem;
