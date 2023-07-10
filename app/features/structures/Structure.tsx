import { selectStructureById, useGetStructuresQuery } from './structuresApiSlice'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { StructureObject } from '@/app/lib/interfaces'
import Status from '@/app/components/main/Status'
import { useSelector } from 'react-redux'
import moment from 'jalali-moment'
import { useState } from 'react'
import { selectAllBoxes } from '../boxes/boxesApiSlice'
import Link from 'next/link'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import useAuth from '@/app/hooks/useAuth'

const Structure = ({ structureId, page }: { structureId: string | undefined, page: string }) => {

    const { 
        data: structures,
        isLoading,
        isSuccess, 
        isError,
      } = useGetStructuresQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
      })
      
    const { isAdmin, isMediaManager } = useAuth()

    const structure: StructureObject | any = useSelector(state => selectStructureById(state, structureId!))
    const allBoxes: any = useSelector(state => selectAllBoxes(state))

    const structureBox: any = allBoxes.find((box: any) => box.boxId === structure.parent)

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
                <td className="px-6 py-4">
                    {structure.isChosen? 
                    <Link href={`/dashboard/billboard/boxes/${structureBox && structureBox.id}`}  target="_blank">
                        <Status
                            status = {structureBox ? structureBox.name : "در باکس"}
                            bgColor = {'#00ff37'}
                            textColor = {'#0a541e'}
                        />
                    </Link>
                    : 
                    <Status
                        status = {'خارج'}
                        bgColor = {'#ff66b3'}
                        textColor = {'#2e030c'}
                    />    
                }
                </td>
                <td className="px-6 py-4 flex items-center gap-5 ">
                {isMediaManager && page === 'all' ?
                <>
                    <AiFillEdit 
                        className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer" size={20}
                        onClick={handleEditStructure}
                    />
                   
                    <AiFillDelete 
                        className="text-orange-600 dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer" size={20}
                        onClick={handleDeleteStructure}    
                    />
                </>
                : page === 'all' &&
                <p>دسترسی محدود</p>
                }

                {page === 'my' &&
                <>
                    <AiFillEdit 
                        className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md" size={20}
                        onClick={handleEditStructure}
                    />
                   
                    <AiFillDelete 
                        className="text-orange-600 dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md" size={20}
                        onClick={handleDeleteStructure}    
                    />
                </>
                }
                    
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
                    <CreateUpdateModal 
                        prop={structure}
                        handleModal={handleEditStructure}
                        type={'editStructure'}
                    />
            
                }
        </>
        )
    } else return null
}

export default Structure