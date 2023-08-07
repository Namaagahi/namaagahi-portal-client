import React, { useState } from 'react'
import { selectPlanById, useGetAllPlansQuery } from '../../apiSlices/plansApiSlice'
import { InitialCustomerObject, PlanObject } from '@/app/lib/interfaces'
import { useSelector } from 'react-redux'
import { selectAllInitialCustomers, useGetAllInitialCustomersQuery } from '../../apiSlices/initialCustomersApiSlice'
import moment from 'jalali-moment'
import useAuth from '@/app/hooks/useAuth'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Status from '@/app/components/main/Status'
import Link from 'next/link'
import ConfirmModal from '@/app/components/modals/ConfirmModal'


const Plan = (props: any) => {
    
    const {
        planId,
        index,
        page
    } = props

    useGetAllPlansQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    })

    const { isAdmin, isMediaManager } = useAuth()

    useGetAllInitialCustomersQuery(undefined, { 
        refetchOnFocus: false, 
        refetchOnMountOrArgChange: false
    })  

    const allInitialCustomers = useSelector(state => selectAllInitialCustomers(state))
    const plan: PlanObject | any = useSelector(state => selectPlanById(state, planId!))
    const foundCustomer: InitialCustomerObject | any = allInitialCustomers.find((customer: any) => customer.id === plan.customerName)

    const [isEditPlan, setIsEditPlan] = useState(false)
    const [isDeletePlan, setIsDeletePlan] = useState(false)

    if(plan) {     
        const handleEditPlan = () => setIsEditPlan(!isEditPlan)
        const handleDeleteSPlan = () => setIsDeletePlan(!isDeletePlan) 

        return (
            <>
                    <tr
                        key={plan._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{plan.username}</td>
                        <td className="px-6 py-4">{plan.planId}</td>
                        <td className="px-6 py-4">{foundCustomer?.name}</td>
                        <td className="px-6 py-4">{plan.brand}</td>
                        <td className="px-6 py-4">{plan.structures.length}</td>
                        <td className="px-6 py-4 flex items-center gap-5 ">
                            {isMediaManager && page === 'all' ?
                            <>
                                <AiFillEdit
                                    className="text-black dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer" size={20}
                                    onClick={handleEditPlan}
                                />
                    
                                <AiFillDelete
                                    className="text-orange-600 dark:text-white hover:scale-125 transition-all p-1 border-[1px] border-[#737373] rounded-md cursor-pointer" size={20}
                                    onClick={handleDeleteSPlan}
                                />
                            </>
                            : page === 'all' &&
                            <p>دسترسی محدود</p>
                            }
                            {/* {page === 'my' &&
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
                            } */}
                    
                        </td>
                        <td className="px-6 py-4">
                        {plan.status === 'suggested'?
                        <Status
                            status = {'پیشنهادی '}
                            bgColor = {'#e8ac05'}
                            textColor = {'#0a541e'}
                        />
                        : plan.status === 'done'?
                        <Status
                            status = {'تایید شده'}
                            bgColor = {'#439400'}
                            textColor = {'#2e030c'}
                        /> : plan.status === 'rejected' &&
                        <Status
                        status = {'رد شده'}
                        bgColor = {'#942300'}
                        textColor = {'#ffc5b3'}
                    />
                    }
                    </td>
                        <td className="px-6 py-4">{moment(plan.createdAt).format('jYYYY/jM/jD')}</td>
                        <td className="px-6 py-4">{moment(plan.updatedAt).format('jYYYY/jM/jD')}</td>
                        <Link href={`/dashboard/billboard/plans/${plan.id}`} target="_blank">
                            <td className=" py-4 cursor-pointer transition-all hover:text-white">
                                <Status
                                    status = {'مشاهده '}
                                    bgColor = {'#34ebc9'}
                                    textColor = {'#0a541e'}
                                />
                            </td>
                        </Link>
                    </tr>
                    {
                    isDeletePlan && 
                    <ConfirmModal 
                        prop={plan} 
                        handleModal={handleDeleteSPlan}
                        type={'delete'} 
                        deleteType="plan"
                    /> 
                }
            </>
        )
        } else return null
}

export default Plan