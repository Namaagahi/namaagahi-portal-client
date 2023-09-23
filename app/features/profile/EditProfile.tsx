import { useUpdateUserMutation } from "@/app/apiSlices/usersApiSlice"
import useAuth from "@/app/hooks/useAuth"
import { EditProfileForm, UserObject } from "@/app/lib/interfaces"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Loading from "../loading/Loading"
import { toast } from "react-toastify"
import { AiOutlineClose } from "react-icons/ai"
import CustomInput from "@/app/components/inputs/CustomInput"
import { useUploadMutation } from "@/app/apiSlices/uploadApiSlice"

type Props = {
  handleModal: () => void
  user: UserObject
}

const EditProfile = (props: Props) => {

  const {
    handleModal,
    user
  } = props

  const { id } = useAuth()

  const [updateUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateUserMutation()

  const [upload, {
    isLoading: uploadLoading
}] = useUploadMutation()

  const [errMsg, setErrMsg] = useState<string | null>(null)
  const [image, setImage] = useState<any>()

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
    setValue
} = editProfileForm

const onSubmit = async(data: any) => {
  const abc = await updateUser({
    id: user._id,
    name: data.name,
    username: user.username,
    roles: user.roles,
    active: user.active,
    avatar: data.avatar
  })
  console.log("ABC", abc)
  // console.log("isError", isError)
  if(isError) {
      'status' in error! && error.status === 409 && setErrMsg('نام ضروری است')
      'status' in error! && error.status === 400 && setErrMsg('فیلدهای مورد نیاز را تکمیل کنید')
  }
}

  if(isSuccess) {
    toast.success(`پروفایل شما با موفقیت ویرایش شد.`)
    handleModal()
}

const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if(e.target.files && e.target.files[0]) {
    console.log(e.target.files[0])
    // setValue('avatar', e.target.files[0])
    setImage(e.target.files[0])
  }
}

const submitImage = async() => {
  const formData = new FormData()
  formData.append('image', image)

  const abc = await upload({formData})
  console.log("abc", abc)
}

  if(!user || isLoading) return <Loading />
console.log("user", user)
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

        <div className="flex flex-col items-start justify-center gap-5 m-6">
          <div className="flex items-center gap-3">
            <input
              type="file"
              id='my-files'
              accept='image/*'
              multiple
              onChange={onImageChange}
            />
            <button className="primaryButton" type="button" onClick={submitImage}>آپلود</button>
          </div>

          <CustomInput 
            key={user._id}
            control={control}
            name={'name'} 
            label={'نام'}
            type={'text'}
            required={true}
            message={'نام را وارد کنید.'}
            errors={errors.name?.message}
            className='p-4 rounded-[50px] bg-blue-100 outline-none text-black'
          />
        </div>

        <div className="flex items-center gap-6">
          <button className={`confirmButton`}>
              ذخیره
          </button>

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