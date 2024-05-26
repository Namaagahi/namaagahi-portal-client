import {
  InitialCustomerObject,
  PlanObject,
  StructureObject,
  UserObject,
} from "@/app/lib/interfaces";
import DeleteInitialCustomer from "@/app/features/initialCustomers/DeleteInitialCustomer";
import DeleteStructure from "@/app/features/structures/DeleteStructure";
import DeletePlan from "@/app/features/plans/DeletePlan";
import DeleteUser from "@/app/features/users/DeleteUser";
import DeleteBox from "@/app/features/boxes/DeleteBox";
import { AiOutlineClose } from "react-icons/ai";
import DeleteFinalCustomer from "@/app/features/finalCustomers/DeleteFinalCustomer";
import DeleteProjectCode from "@/app/features/projectCodes/DeleteProjectCode";
import DeleteChatroom from "@/app/features/chatrooms/DeleteChatroom";
import DeleteAllMessages from "@/app/features/chatrooms/DeleteAllMessages";
import DeleteProposal from "@/app/features/proposal/DeleteProposal";
import DeleteAsset from "@/app/features/itAssets/DeleteAsset";

interface Props {
  handleModal: () => void;
  prop?:
    | UserObject
    | StructureObject
    | PlanObject
    | InitialCustomerObject
    | any;
  deleteType: string;
}

const DeleteModalContent = (props: Props) => {
  const { handleModal, prop, deleteType } = props;

  return (
    <div className="confirmModalContent">
      <div className="flex justify-between items-center">
        <p className="md:text-2xl text-xl font-bold">تایید حذف</p>

        <AiOutlineClose
          className="cursor-pointer text-xl hover:text-2xl transition-all"
          onClick={handleModal}
        />
      </div>

      <div className="flex flex-col py-12">
        <div className="py-7 border-[1px] border-x-transparent border-y-[#FA9E93]">
          <p className="text-xl">
            آیا از انجام این کار مطمئن هستید؟ این عمل برگشت پذیر نخواهد بود.
          </p>
        </div>
      </div>

      {deleteType === "user" ? (
        <DeleteUser user={prop} handleModal={handleModal} />
      ) : deleteType === "structure" ? (
        <DeleteStructure structure={prop} handleModal={handleModal} />
      ) : deleteType === "asset" ? (
        <DeleteAsset asset={prop} handleModal={handleModal} />
      ) : deleteType === "box" ? (
        <DeleteBox box={prop} handleModal={handleModal} />
      ) : deleteType === "initialCustomer" ? (
        <DeleteInitialCustomer
          initialCustomer={prop}
          handleModal={handleModal}
        />
      ) : deleteType === "plan" ? (
        <DeletePlan plan={prop} handleModal={handleModal} />
      ) : deleteType === "finalCustomer" ? (
        <DeleteFinalCustomer finalCustomer={prop} handleModal={handleModal} />
      ) : deleteType === "projectCode" ? (
        <DeleteProjectCode projectCode={prop} handleModal={handleModal} />
      ) : deleteType === "chatroom" ? (
        <DeleteChatroom chatroom={prop} handleModal={handleModal} />
      ) : deleteType === "allMessages" ? (
        <DeleteAllMessages chatroomId={prop} handleModal={handleModal} />
      ) : deleteType === "proposal" ? (
        <DeleteProposal proposal={prop} handleModal={handleModal} />
      ) : null}
    </div>
  );
};

export default DeleteModalContent;
