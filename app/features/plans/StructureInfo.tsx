import { formatNumber } from '@/app/utilities/formatNumber' 
import useAuth from '@/app/hooks/useAuth'
import { CombinedStructure } from '@/app/lib/interfaces'

type Props = {
    handleModal: () => void
    selectedStructure: CombinedStructure
}

const StructureInfo = (props: Props) => {

    const {
        handleModal,
        selectedStructure
    } = props

    const {
        isAdmin,
        isMediaManager
    } = useAuth()

    return (
        <div className="modal-container">
            <div onClick={handleModal} className="backdrop-container"></div>
            <div className="create-update-modal-content-container">
                <div className="flex flex-col text-lg text-center py-12">
                    <div className="p-7 border-[1px] border-x-transparent border-y-[#FA9E93]">
                        <p>
                            {`کد سامانه: ${selectedStructure.name}`}
                        </p>

                        <p>
                            {`نوع سازه: ${selectedStructure.marks.name}`}
                        </p>

                        <p>
                            {`مساحت: ${selectedStructure.marks.markOptions.printSize} متر`}
                        </p>

                        <p>
                            {`وجه: ${selectedStructure.marks.markOptions.face}`}
                        </p>

                        <p>
                            {`تیپ: ${selectedStructure.marks.markOptions.style}`}
                        </p>

                        <p>
                            {`منطقه: ${selectedStructure.location.district}`}
                        </p>

                        <p>
                            {`مسیر: ${selectedStructure.location.path}`}
                        </p>

                        <p>
                            {`نشانی: ${selectedStructure.location.address}`}
                        </p>

                        <p>
                            {`تعرفه ماهیانه پیشبینی شده: ${formatNumber(selectedStructure.monthlyBaseFee, ',')} ریال`}
                        </p>
                        {(isAdmin || isMediaManager) &&
                                <p>
                                    {`تمام شده ماهیانه با هزینه سربار پیشبینی شده: ${formatNumber(selectedStructure.costs.totalMonthlyCost!, ',')} ریال`}
                                </p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StructureInfo