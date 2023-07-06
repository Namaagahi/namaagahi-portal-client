import AccessDeniedModeal from '@/app/components/modals/AccessDeniedModeal'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import { selectStructureById, useGetStructuresQuery } from './structuresApiSlice'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { StructureObject } from '@/app/lib/interfaces'
import Status from '@/app/components/main/Status'
import useAuth from '@/app/hooks/useAuth'
import { useSelector } from 'react-redux'
import moment from 'jalali-moment'
import { useState } from 'react'

const Structure = ({ structureId }: { structureId: string | undefined }) => {

    const { isAdmin } = useAuth()

    const { 
        data: structures,
        isLoading,
        isSuccess, 
        isError,
      } = useGetStructuresQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
      })

    const structure: StructureObject | any = useSelector(state => selectStructureById(state, structureId!))

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
                <td className="px-6 py-4">{structure.name}</td>
                <td className="px-6 py-4">{structure.location.district}</td>
                <td className="px-6 py-4">{structure.location.path}</td>
                <td className="px-6 py-4">{structure.location.address}</td>
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
                <td className="px-6 py-4 flex items-center gap-5 cursor-pointer">
                    <AiFillEdit 
                        className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md" size={20}
                        onClick={handleEditStructure}
                    />
                   
                    <AiFillDelete 
                        className="text-orange-600 dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md" size={20}
                        onClick={handleDeleteStructure}    
                    />
                    
                </td>
                <td className="px-6 py-4">{moment(structure.createdAt).format('jYYYY/jM/jD')}</td>
                <td className="px-6 py-4">{moment(structure.updatedAt).format('jYYYY/jM/jD')}</td>
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