import { StructureObject } from '@/app/lib/interfaces'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectStructureById } from './structuresApiSlice'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import dynamic from 'next/dynamic'
const Status = dynamic(
  () => import('@/app/components/main/Status'),
  { ssr: false } 
)
const ConfirmModal = dynamic(
  () => import('@/app/components/modals/ConfirmModal'),
  { ssr: false }
)

const Structure = ({ structureId }: { structureId: string }) => {

    const structure: StructureObject | any = useSelector(state => selectStructureById(state, structureId))

    const [isEditStructure, setIsEditStructure] = useState(false)

    const [isDeleteStructure, setIsDeleteStructure] = useState(false)

    if(structure) {

        const handleEditStructure = () => setIsEditStructure(!isEditStructure)

        const handleDeleteStructure = () => setIsDeleteStructure(!isDeleteStructure)

        return (
        <>
            <tr 
                key={structure._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
                <td className="px-6 py-4">{structure.username}</td>
                <td className="px-6 py-4">{structure.sysCode}</td>
                <td className="px-6 py-4">{structure.kind}</td>
                <td className="px-6 py-4">{structure.district}</td>
                <td className="px-6 py-4">{structure.path}</td>
                <td className="px-6 py-4">{structure.address}</td>
                <td className="px-6 py-4">{structure.style}</td>
                <td className="px-6 py-4">{structure.face}</td>
                <td className="px-6 py-4">{structure.dimensions}</td>
                <td className="px-6 py-4">{structure.printSize}</td>
                <td className="px-6 py-4">{structure.docSize}</td>
                <td className="px-6 py-4">
                    {structure.isAvailable? 
                    <Status 
                        status = {'خالی '} 
                        bgColor = {'#a8edbb'}
                        textColor = {'#0a541e'}
                    />
                    : 
                    <Status
                        status = {'پر'}
                        bgColor = {'#d96f85'}
                        textColor = {'#2e030c'}
                    />    
                }
                </td>
                <td className="px-6 py-4 flex items-center gap-5">
                    <td className="flex items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillEdit 
                            className="text-black dark:text-white hover:scale-125 transition-all" size={20}
                            onClick={handleEditStructure}
                        />
                    </td>
                    <td className="flex justify-center items-center p-1 border-[1px] border-[#737373] rounded-md cursor-pointer">
                        <AiFillDelete 
                            className="text-orange-600 dark:text-white hover:scale-125 transition-all" size={20}
                            onClick={handleDeleteStructure}    
                        />
                    </td>
                </td>
                {/* <td className="px-6 py-4">{moment(structure.createdAt).format("MMM Do YYYY")}</td>
                <td className="px-6 py-4">{moment(structure.updatedAt).format("MMM Do YYYY")}</td> */}
            </tr>

            {
                isDeleteStructure && 
                    <ConfirmModal 
                        prop={structure} 
                        handleModal={handleDeleteStructure}
                        type={'delete'} 
                        deleteType="structure"
                    />
            } 

            {
                isEditStructure && 
                    <p>در حال ساخت</p>
            }
        </>
        )
    } else return null
}

export default Structure