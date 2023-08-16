import Logout from "@/app/features/logout/Logout"
import { AiOutlineClose } from "react-icons/ai"

type Props = {
  handleModal: () => void
}

const LogoutModalContent = (props: Props) => {

  const { handleModal } = props

  return (
    <div className="confirm-modal-content">
      <div className="flex justify-between items-center">
        <p className="md:text-2xl text-xl font-bold">تایید</p>
        <AiOutlineClose className="cursor-pointer text-xl hover:text-2xl transition-all" onClick={handleModal}/>
      </div>

      <div className="flex flex-col py-12">
        <div className="py-7 border-[1px] border-x-transparent border-y-[#FA9E93]">
            <p className="text-xl">آیا میخواهید خارج شوید؟</p>
        </div>
      </div>

      <Logout 
        handleModal={handleModal}
      />
    </div>
  )
}

export default LogoutModalContent