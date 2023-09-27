import { useUpdateUserMutation } from "@/app/apiSlices/usersApiSlice"
import useAuth from "@/app/hooks/useAuth"
import { EditProfileForm, UserObject } from "@/app/lib/interfaces"
import { useEffect, useState } from "react"
import Loading from "../loading/Loading"
import { toast } from "react-toastify"
import { AiOutlineClose } from "react-icons/ai"
import CustomInput from "@/app/components/inputs/CustomInput"
import { useForm } from "react-hook-form"
import Image from "next/image"

type Props = {
  handleModal: () => void
  user: UserObject
}

const EditProfile = (props: Props) => {

  const {
    handleModal,
    user
  } = props

  const [errMsg, setErrMsg] = useState<string>('')

  const [updateUser, {
    error,
    isLoading,
    isError,
    isSuccess
  }] = useUpdateUserMutation()

  const editProfileForm = useForm<EditProfileForm>({
    defaultValues: {
      name: user.name,
      avatar: user.avatar
    },
    mode: 'onSubmit'
  })

  const {
    control,
    handleSubmit,
    formState: {errors},
    register,
    getValues
} = editProfileForm

const onSubmit = async (data: any) => {
  let avatar = user.avatar

  if (data.avatar[0] instanceof File) {
    const file = data.avatar[0]

    if (file instanceof File && file.size > 100 * 1024) {
      setErrMsg('حجم تصویر باید کمتر از 100 کیلوبایت باشد.')
      return
    }
    
    const reader = new FileReader()

    reader.onload = async (event) => {
      const dataURL = event.target?.result as string
      const updatedUserData = {
        id: user._id,
        name: data.name,
        username: user.username,
        roles: Array.isArray(user.roles) ? user.roles : [user.roles],
        active: user.active,
        avatar: dataURL,
      };

      await updateUser(updatedUserData)
      toast.success(`پروفایل شما با موفقیت ویرایش شد.`)
      handleModal();
    }

    reader.readAsDataURL(file)
  } else {
    const updatedUserData = {
      id: user._id,
      name: data.name,
      username: user.username,
      roles: Array.isArray(user.roles) ? user.roles : [user.roles],
      active: user.active,
      avatar: avatar,
    }

    await updateUser(updatedUserData)
    toast.success(`پروفایل شما با موفقیت ویرایش شد.`)
    handleModal()
  }
}

  if(isSuccess) {
    toast.success(`پروفایل شما با موفقیت ویرایش شد.`)
    handleModal()
  }

  console.log('user', user)
  if(!user || isLoading) return <Loading />
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
      <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <p className="md:text-2xl text-xl font-bold">
              ویرایش پروفایل
          </p>

          <AiOutlineClose 
              className="cursor-pointer text-xl hover:text-2xl transition-all" 
              onClick={handleModal}
          />
        </div>

        <div className="flex gap-3 items-center justify-between">
          <div className="flex flex-col my-5 gap-3 w-1/2">
            <CustomInput
              key={user._id}
              control={control}
              name={'name'}
              label={'نام'}
              type={'text'}
              required={true}
              message={'نام را وارد کنید.'}
              errors={errors.name?.message}
              className='formInput2'
            />
            <input type="file" className="formInput2" {...register("avatar")} />
            <p className="text-red-500">{errMsg ? errMsg : ''}</p>
          </div>
            <Image
            className="rounded-full w-44 h-44"
              src={typeof getValues('avatar') ==='object' ? URL.createObjectURL(getValues('avatar')[0]) : user?.avatar}
              alt="profile-image"
              width={176}
              height={176}
            />
        </div>

        <div className="flex items-center gap-6">
          <input
            className={`confirmButton cursor-pointer`}
            type="submit"
          />
              

          <button 
              onClick={handleModal}
              className="cancelButton"
          >
              لغو
          </button>
        </div>
      </form>
    </div>
  ) 
}

export default EditProfile