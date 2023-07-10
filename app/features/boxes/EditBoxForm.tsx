import { EditBoxProps } from '@/app/lib/interfaces'
import React, { useState } from 'react'
import { useUpdateBoxMutation } from './boxesApiSlice'
import { useRouter } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'
import BoxStructureFormContent from './BoxStructureFormContent'
import BoxBaseFormContent from './BoxBaseFormContent'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
const Loading = dynamic(
  () => import('@/app/features/loading/Loading'),
  { ssr: false }
)

const EditBoxForm = (props: EditBoxProps) => {

    const { handleModal, box } = props
    
    const [updateBox, {
      isLoading,
      isSuccess,
      isError,
      error
  }] = useUpdateBoxMutation()

  const { push } = useRouter()

  const [boxData, setBoxData] = useState<any>({
    name: box?.name,
    duration: {
      startDate: box?.duration.startDate,
      endDate: box?.duration.endDate
    },
    mark: {
      name: box?.mark.name,
      markOptions: {
        brand: box?.mark.markOptions.brand,
        projectNumber: box?.mark.markOptions.projectNumber
      }
    }
  })

  const { name, duration, mark } = boxData

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setBoxData({...boxData, name: e.target.value})

  const onSaveBoxClick = async () => {
    await updateBox({ id: box!.id, userId: box?.userId, name, duration, mark  })

    handleModal()
    toast.success(`باکس ${box!.name} با موفقیت ویرایش شد`)
}

  let canSave
  // if (password) canSave = [roles!.length, validUserName, validPassWord].every(Boolean) && !isLoading
  // else canSave = [roles!.length, validUserName].every(Boolean) && !isLoading

  if(isLoading) return <Loading/>  
  return (
    <div className="py-5 px-8 w-full text-black dark:text-white">
      <form
        className="flex flex-col"
    // onSubmit={onSaveUserClick}
      >
        <div className="flex justify-between items-center">
            <p className="md:text-2xl text-xl font-bold">ویرایش باکس</p>
            <AiOutlineClose 
                className="cursor-pointer text-xl hover:text-2xl transition-all" 
                onClick={handleModal}/>
        </div>
          <BoxBaseFormContent
            name={name}
            startDate={duration.startDate}
            endDate={duration.endDate}
            markName={mark.name}
            brand={mark.markOptions.brand}
            projectNumber={mark.markOptions.projectNumber}
            onNameChange={onNameChange}
            isError={isError}
          />
          {/* <BoxStructureFormContent /> */}

        <div className="flex items-center gap-6">
          <button
              disabled={!canSave}
              className={`${!canSave && 'bg-[#afafd2] text-gray-500 border-[#afafd2]'} bg-[#5858FA] py-3 w-2/3 rounded-lg text-xl border-[1px] border-[#5858FA] hover:border-[#3636a3] hover:bg-[#3636a3] transition-all text-white`}
          >ذخیره</button>
          <button 
              onClick={handleModal}
              className=" py-3 w-1/3 rounded-lg text-xl border-[1px] border-[#808080] dark:border-white hover:bg-black hover:text-white transition-all"
          >لغو</button>
      </div>
      </form>
    </div>
  )
}

export default EditBoxForm