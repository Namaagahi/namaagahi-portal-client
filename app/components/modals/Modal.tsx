import NewUserForm from "@/app/dashboard/users/NewUserForm"

const Modal = ({handleModal, type} : {handleModal: () => void, type: string}) => {
  return (
    <div className="fixed top-[50%] left-[50%] flex flex-col justify-center items-center">
      <div onClick={handleModal} className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-[1000]"></div>
      <div className="fixed flex flex-col justify-center items-center w-[80%] xl:w-[33%] md:w-[66%] min-h-[50%] bg-white rounded-3xl z-[1000]">
        { 
          type === 'newUser' ? 
            <NewUserForm />
              : type === 'editUser'? 
                <p>Edit user</p>
                : type === 'newTask'? 
                <p>New Task</p>
                : type === 'editTask'? 
                <p>Edit Task</p>
                : <p>felan hichi lol</p>
        }
      </div>     
    </div>
  )
}

export default Modal