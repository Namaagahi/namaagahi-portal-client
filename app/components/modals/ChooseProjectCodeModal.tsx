import { FinalCustomerObject, ProjectCodeObject } from "@/app/lib/interfaces"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

type Props = {
    handleModal: () => void
    data: ProjectCodeObject[]
    allFinalCustomers: FinalCustomerObject[]
    handleProjectCodeId: (projectCode: ProjectCodeObject | string) => void
}

const ChooseProjectCodeModal = (props: Props) => {

    const {
        handleModal,
        data,
        allFinalCustomers,
        handleProjectCodeId
    } = props

    const [searchText, setSearchText] = useState<string>("")
    const [searchResults, setSearchResults] = useState<ProjectCodeObject[]>([])
    const [selectedItem, setSelectedItem] = useState<ProjectCodeObject | null>(null)

    const performSearch = (value: string) => {
        if(data && data[0]) {
            const searchText = value.toLowerCase()
            const filteredResults = data.filter((item: ProjectCodeObject) =>{
                return (
                    item.code.toLowerCase().includes(searchText)
                )
            }
            )
            setSearchResults(filteredResults)
        } else {
            return
        }
    }

    const handleSelectResult = (item: ProjectCodeObject) => setSelectedItem(item)

    const handleConfirmSelection = () => {
        if(selectedItem) {
            handleProjectCodeId(selectedItem)
            handleModal() 
        } else {
            return
        }
    } 
    console.log("selectedItem", selectedItem)

    return (
        <div className="modalContainer">
            <div 
                onClick={handleModal} 
                className="backdropContainer bg-opacity-10"
            ></div>

            <div className="confirmModalContentContainer">
                <div className="confirmModalContent">
                    <div className="flex justify-between items-center">
                        <p className="md:text-2xl text-xl font-bold">
                            {"انتخاب کد پروژه"}
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
                                placeholder="جستجوی کد پروژه"
                                className='formInput2'
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value)
                                    performSearch(e.target.value)
                                }}
                            />
                            
                            <div className='mt-4 bg-cyan-100 text-gray-700 font-bold rounded-xl p-3 h-[200px] overflow-y-auto'>
                                <ul>
                                    {searchResults.length === 0 ? 
                                    data.map((item, index) => {
                                        const finalCustomer = allFinalCustomers.find((finalCustomer: FinalCustomerObject) => finalCustomer._id === item.finalCustomerId)
                                        return (
                                        <li
                                            className='mt-2 cursor-pointer hover:text-red-700 transition-all'
                                            key={index}
                                            onClick={() => handleSelectResult(item)}
                                        >
                                            {`${item.code} - ${finalCustomer?.name}`}
                                        </li>
                                        )
                                    })
                                    : (
                                    searchResults.map((item, index) => {
                                        const finalCustomer = allFinalCustomers.find((finalCustomer: FinalCustomerObject) => finalCustomer._id === item.finalCustomerId)
                                        console.log("finalCustomer", finalCustomer)
                                        return (
                                            <li
                                                className='mt-2 cursor-pointer hover:text-red-700 transition-all'
                                                key={index}
                                                onClick={() => handleSelectResult(item)}
                                            >
                                                {`${item.code} - ${finalCustomer?.name}`}
                                            </li>
                                        )
                                    })
                                    )}
                                </ul>
                            </div>
                        </div>
                        <p
                            className='dark:text-gray-200 cursor-pointer hover:font-bold hover:dark:text-buttonHover transition-all'
                            onClick={() => {
                                handleProjectCodeId("")
                                handleModal()
                            }}
                        >
                            {"عدم تخصیص کد پروژه"}
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            type='button'
                            onClick={handleConfirmSelection}
                            className={` ${!selectedItem ? 'deleteConfirmButton bg-gray-500 hover:bg-gray-500' : 'deleteConfirmButton'}`}
                            disabled={!selectedItem}
                            >
                            انتخاب
                        </button>

                        <button 
                            type='button'
                            onClick={handleModal}
                            className="cancelButton"
                            >
                            انصراف
                        </button>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default ChooseProjectCodeModal