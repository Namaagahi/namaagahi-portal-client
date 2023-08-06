import { useUpdateStructureMutation } from '../../apiSlices/structuresApiSlice'
import { EditStructureProps, UserObject } from '@/app/lib/interfaces'
import { AiOutlineClose } from 'react-icons/ai'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import useAuth from '@/app/hooks/useAuth'
import { selectAllUsers, useGetUsersQuery } from '../../apiSlices/usersApiSlice'
import { useSelector } from 'react-redux'
const Loading = dynamic(
    () => import('@/app/features/loading/Loading'),
    { ssr: false }
  )
  
const EditStructureForm = (props: EditStructureProps) => {

    const { handleModal, structure } = props

    const [updateStructure, {
        isLoading,
        isError,
        error
    }] = useUpdateStructureMutation()

    const {
        data: users, 
      } = useGetUsersQuery(undefined, { 
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
      }) 

    const allUsers: UserObject[] | any  = useSelector(selectAllUsers)

    const { isAdmin } = useAuth()

    const [structureData, setStructureData] = useState<any>({
        userId: structure?.userId,
        name: structure?.name,
        district: structure?.location.district,
        path: structure?.location.path,
        address: structure?.location.address
    })

    const { userId, name, district, path, address } = structureData

    const onUserChange = (e: React.ChangeEventHandler<HTMLSelectElement> | any) => setStructureData({...structureData, userId: e.target.value})
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setStructureData({...structureData, name: e.target.value})
    const onDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => setStructureData({...structureData, district: e.target.value})
    const onPathChange = (e: React.ChangeEvent<HTMLInputElement>) => setStructureData({...structureData, path: e.target.value})
    const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => setStructureData({...structureData, address: e.target.value})

    const onSaveStructureClick = async () => {
        await updateStructure({
             id: structure!.id,
             userId: userId,
             parent: structure?.parent,
             name,
             location: { district, path, address },
             isAvailable: true  
        })
    
        handleModal()
        toast.success(`سازه ${structure!.name} با موفقیت ویرایش شد`)
    }

    return (
        <div className="py-5 px-8 w-full text-black dark:text-white">
            <form
                className="flex flex-col"
                onSubmit={onSaveStructureClick}
            >
                <div className="flex justify-between items-center">
                    <p className="md:text-2xl text-xl font-bold">ویرایش سازه</p>
                    <AiOutlineClose 
                        className="cursor-pointer text-xl hover:text-2xl transition-all" 
                        onClick={handleModal}/>
                </div>

                { isAdmin &&
                    <div className="flex items-center justify-between w-full pt-12">
                        <label htmlFor="userId">کاربر</label>
                        <select 
                            onChange={onUserChange}
                            className="select select-bordered form-input w-[80%] ">
                            {
                                allUsers.map((user: any, index: number) => {
                                    return(  
                                        <option 
                                            className='text-black'
                                            value={user.id}
                                            key={user.id}
                                            id="userId"
                                        >
                                            {user.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                }

                <div className="flex flex-col pb-7">
                    <div className="flex items-center gap-4 justify-between w-full">
                        <label htmlFor="name">نام سازه</label>
                        <input
                            id='name'
                            value={name}
                            type="text"
                            className={`${isError && 'border-rose-700'} form-input w-[80%]`}
                            onChange={onNameChange}
                        />
                    </div>
                    <div className="flex items-center gap-4 justify-between w-full">
                        <label htmlFor="district">منطقه</label>
                        <input
                            id='district'
                            value={district}
                            type="text"
                            className={`${isError && 'border-rose-700'} form-input w-[80%]`}
                            onChange={onDistrictChange}
                        />
                    </div>
                    <div className="flex items-center gap-4 justify-between w-full">
                        <label htmlFor="path">مسیر</label>
                        <input
                            id='path'
                            value={path}
                            type="text"
                            className={`${isError && 'border-rose-700'} form-input w-[80%]`}
                            onChange={onPathChange}
                        />
                    </div>
                    <div className="flex items-center gap-4 justify-between w-full">
                        <label htmlFor="address">آدرس</label>
                        <input
                            id='address'
                            value={address}
                            type="text"
                            className={`${isError && 'border-rose-700'} form-input w-[80%]`}
                            onChange={onAddressChange}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        className={` bg-[#5858FA] py-3 w-2/3 rounded-lg text-xl border-[1px] border-[#5858FA] hover:border-[#3636a3] hover:bg-[#3636a3] transition-all text-white`}
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

export default EditStructureForm