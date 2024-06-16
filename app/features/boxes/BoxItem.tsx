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

const BoxItem = (props: Props) => {
  const { boxId, index, page } = props;
  const { id } = useAuth();

  const box: BoxObject = useSelector(
    (state) => selectBoxById(state, boxId) as BoxObject
  );

  const allUsers: UserObject[] = useSelector(
    (state) => selectAllUsers(state) as UserObject[]
  );
  const user = allUsers.find((x) => x.username === box.username);

  return page === "my" && box.userId === id ? (
    <ListItem
      number={index}
      param={boxId}
      prop={box}
      startDate={box.duration.startDate}
      endDate={box.duration.endDate}
      diff={box.duration.diff}
      titles={{
        "نام باکس": box.name,
        "نوع باکس": box.mark.name,
        "کاربر ایجاد کننده": box.username,
        "کد پروژه": box.mark.markOptions?.projectNumber,
        برند: box.mark.markOptions?.brand,
      }}
    />
  ) : (
    <ListItem
      number={index}
      param={boxId}
      prop={box}
      startDate={box.duration.startDate}
      endDate={box.duration.endDate}
      diff={box.duration.diff}
      titles={{
        "نام باکس": box.name,
        "نوع باکس": box.mark.name,
        "کاربر ایجاد کننده": user?.name,
        "کد پروژه": box.mark.markOptions?.projectNumber,
        برند: box.mark.markOptions?.brand,
      }}
    />
  );
};

export default BoxItem;
