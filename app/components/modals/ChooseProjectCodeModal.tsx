import { useCreateNewProjectCodeMutation, useUpdateProjectCodeMutation } from "@/app/apiSlices/projectCodeApiSlice"
import Loading from "@/app/features/loading/Loading"
import useAuth from "@/app/hooks/useAuth"
import { jalaliMonths } from "@/app/lib/constants"
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

    const { id } = useAuth()

    const [createNewProjectCode, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateNewProjectCodeMutation()

    const [searchText, setSearchText] = useState<string>("")
    const [searchResults, setSearchResults] = useState<ProjectCodeObject[]>([])
    const [selectedItem, setSelectedItem] = useState<ProjectCodeObject | null>(null)
    const [hasChildCode, setHasChildCode] = useState<boolean>(false)
    const [jalaliMonth, setJalaliMonth] = useState<string>('')

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

    const handleConfirmSelection = async() => {
        if(selectedItem && !jalaliMonth) {
            handleProjectCodeId(selectedItem)
            handleModal() 
        } else if(selectedItem && jalaliMonth) {
            const abc = await createNewProjectCode({
                userId: id,
                media: selectedItem.media,
                year: selectedItem.year, 
                finalCustomerId: selectedItem.finalCustomerId,
                brand: selectedItem.brand,
                desc: selectedItem.desc, 
                code: selectedItem.code,
                month: jalaliMonth
            })
            console.log("ABC", abc)
            handleModal()
        } else {
            return
        }
    } 

    if(isLoading) return <Loading />
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
                        <div className="py-7 border-[1px] border-x-transparent border-y-[#FA9E93] ">
                            <div className="flex items-center justify-between">
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
                                {selectedItem && <p>{selectedItem.code} - {selectedItem.brand}</p>}
                            </div>
                            
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
                                            {`${item.code} - ${finalCustomer?.name} - ${item.brand}`}
                                        </li>
                                        )
                                    })
                                    : (
                                    searchResults.map((item, index) => {
                                        const finalCustomer = allFinalCustomers.find((finalCustomer: FinalCustomerObject) => finalCustomer._id === item.finalCustomerId)

                                        return (
                                            <li
                                                className='mt-2 cursor-pointer hover:text-red-700 transition-all'
                                                key={index}
                                                onClick={() => handleSelectResult(item)}
                                            >
                                                {`${item.code} - ${finalCustomer?.name} - ${item.brand}`}
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
                            {"پاک کردن کد پروژه"}
                        </p>
                        <div className="flex flex-col justify-between gap-3">
                            {
                                selectedItem &&
                                    <button
                                        className="border-[1px] dark:border-white border-black rounded-md p-1 text-sm w-1/4 mt-2 hover:bg-black hover:border-black hover:text-white"
                                        type='button'
                                        onClick={() => {
                                            setHasChildCode(!hasChildCode)}
                                        }
                                    >
                                        {!hasChildCode? 'تخصیص ماه': 'عدم تخصیص ماه'}
                                    </button>
                            }
                            {
                            hasChildCode &&
                                <>
                                    <select
                                        className='formInput w-1/4 dark:text-black p-[1.9px]'
                                        onChange={(e) => setJalaliMonth(e.target.value)}
                                    >
                                        <option value="" >
                                            انتخاب ماه
                                        </option>
                                        {jalaliMonths.map((month, index) => {
                                            return(
                                                <option
                                                    key={month.id}
                                                    value={month.id}
                                                    className='text-black'
                                                >
                                                    {month.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <p className="text-red-500">{!jalaliMonth && 'ماه را انتخاب کنید!'}</p>
                                </>
                        }
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            type='button'
                            onClick={handleConfirmSelection}
                            className={` ${!selectedItem || (hasChildCode && !jalaliMonth)? 'deleteConfirmButton bg-gray-500 hover:bg-gray-500' : 'deleteConfirmButton'}`}
                            disabled={!selectedItem || (hasChildCode && !jalaliMonth)}
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