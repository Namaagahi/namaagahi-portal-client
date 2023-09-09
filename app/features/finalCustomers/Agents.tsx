import CustomInput from "@/app/components/inputs/CustomInput"
import { finalCustomerAgentFormValues } from "@/app/lib/constants"
import { AddFinalCustomerForm, AgentObject, EditFinalCustomerForm } from "@/app/lib/interfaces"
import { Control, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form"
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai"

type Props = {
    agentField: FieldArrayWithId<AddFinalCustomerForm, "agent", "id">[] | UseFieldArrayAppend<EditFinalCustomerForm, "agent">[]
    control: Control<AddFinalCustomerForm, any> | Control<EditFinalCustomerForm, any>
    isDisabled?: boolean
    appendAgent: UseFieldArrayAppend<AddFinalCustomerForm, "agent"> | UseFieldArrayAppend<EditFinalCustomerForm, "agent">
    removeAgent: UseFieldArrayRemove
}

const Agents = (props: Props) => {

    const {
        agentField,
        control,
        isDisabled,
        appendAgent,
        removeAgent
    } = props

    // console.log("agentField", agentField)
  return (
    <div className="backdrop-blur bg-white/30 border-[1px] dark:text-black border-gray-400 col-span-2 rounded-md mb-2 pl-2 pr-4">
        {
            agentField.map((item: any, fieldIndex: number) => {
                return (
                    <div 
                        className="flex items-center gap-2 justify-center"
                        key={item._id}
                    >
                        <div className='absolute right-0 top-0 min-h-[10px] overflow-hidden w-4 rounded-md bg-primary text-white flex justify-center items-center font-bold  hover:scale-125 cursor-pointer transition-all'>
                            {fieldIndex + 1}
                        </div>
                        <CustomInput
                            label={'نام نماینده'}
                            type="text"
                            name= {`agent.${fieldIndex}.agentName`}
                            control={control}
                            className={`formInput dark:bg-white`}
                            disabled={isDisabled}
                            autoComplete={'off'}
                        />
                        <CustomInput
                            label={'پست سازمانی'}
                            type="text"
                            name= {`agent.${fieldIndex}.post`}
                            control={control}
                            className={`formInput dark:bg-white`}
                            disabled={isDisabled}
                            autoComplete={'off'}
                        />
                        {
                        !isDisabled && 
                            <AiFillMinusCircle
                                className={`absolute bottom-0 ${fieldIndex === 0 ? 'hidden' : 'block'} cursor-pointer text-2xl hover:text-red-700 transition-all`}
                                onClick={() => removeAgent(fieldIndex)} 
                            />
                        }
                    </div>
                )
            })
        }
        {
        !isDisabled && 
            <AiFillPlusCircle 
                className="cursor-pointer text-2xl hover:text-green-700 transition-all"
                onClick={() => appendAgent(finalCustomerAgentFormValues)}
            />
        }
    </div>
  )
}

export default Agents