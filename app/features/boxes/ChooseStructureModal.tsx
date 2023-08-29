import { AddBoxForm, AddPlanForm, EditBoxForm, EditPlanForm, StructureObject } from '@/app/lib/interfaces'
import React, { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
    handleModal: () => void
    data: StructureObject[]
    fieldIndex: number
    setValue: any
    handleThisStructuresChange: (index: number, val: string) => void
}

const ChooseStructureModal = (props: Props) => {

    const {
        handleModal,
        data,
        fieldIndex,
        setValue,
        handleThisStructuresChange,
    } = props

    const [searchText, setSearchText] = useState<string>("")
    const [searchResults, setSearchResults] = useState<StructureObject[]>([])
    const [selectedItem, setSelectedItem] = useState<StructureObject | null>(null)

    const performSearch = (value: string) => {
        const searchText = value.toLowerCase()
        const filteredResults = data.filter((item: StructureObject) =>{
            return (
                item.name.toLowerCase().includes(searchText) ||
                item.location.address.toLowerCase().includes(searchText) ||
                item.location.path.toLowerCase().includes(searchText)
            )
        }
        )
    
        setSearchResults(filteredResults)
    }

    const handleSelectResult = (item: StructureObject) => setSelectedItem(item)

    const handleConfirmSelection = () => {
        if (selectedItem && selectedItem.id) {
            setValue(`structures.${fieldIndex}.structureId`, selectedItem.id)
            handleThisStructuresChange(fieldIndex, selectedItem.name)
            handleModal() 
        }
    }
    
    return (
        <div className="modal-container">
            <div 
                onClick={handleModal} 
                className="backdrop-container bg-opacity-10"
            ></div>
              <div className="confirm-modal-content-container ">
                <div className="confirm-modal-content">
                    <div className="flex justify-between items-center">
                        <p className="md:text-2xl text-xl font-bold">
                            {"انتخاب سازه"}
                        </p>

                        <AiOutlineClose 
                            className="cursor-pointer text-xl hover:text-2xl transition-all" 
                            onClick={handleModal}
                        />
                    </div>

                    <div className="flex flex-col py-12">
                        <div className="py-7 border-[1px] border-x-transparent border-y-[#FA9E93]">
                            <input
                                type="text"
                                placeholder="جستجو"
                                className='form-input'
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value)
                                    performSearch(e.target.value)
                                }}
                            />
                            <div className='mt-4 bg-cyan-100 text-gray-700 font-bold rounded-xl p-3 h-[200px] overflow-y-auto'>
                                <ul>
                                    {searchResults.length === 0 ? (
                                    <li>
                                        هیچ موردی یافت نشد.
                                    </li>
                                    ) : (
                                    searchResults.map((item, index) => (
                                        <li
                                            className='mt-2 cursor-pointer hover:text-red-700 transition-all'
                                            key={index}
                                            onClick={() => handleSelectResult(item)}
                                        >
                                            {`${item.name} - ${item.location.address} - ${item.location.path}`}
                                        </li>
                                    ))
                                    )}
                                </ul>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    className='form-input w-1/6'
                                    type="text"
                                    disabled
                                    value={selectedItem?.name || ""}
                                />
                                <input
                                    className='form-input w-4/6'
                                    type="text"
                                    disabled
                                    value={selectedItem?.location.address || ""}
                                />
                                <input
                                    className='form-input w-1/6'
                                    type="text"
                                    disabled
                                    value={selectedItem?.location.path || ""}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            type='button'
                            onClick={handleConfirmSelection}
                            className={` ${!selectedItem ? 'btn-confirm bg-gray-500 hover:bg-gray-500' : 'btn-confirm'}`}
                            disabled={!selectedItem}
                        >
                            انتخاب
                        </button>

                        <button 
                            type='button'
                            onClick={handleModal}
                            className="btn-cancel"
                        >
                            انصراف
                        </button>
                    </div>
                </div>
              </div>
        </div>
    )
}

export default ChooseStructureModal