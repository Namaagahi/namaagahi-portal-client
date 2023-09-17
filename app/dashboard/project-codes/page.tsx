"use client"
import { selectAllFinalCustomers, useGetAllFinalCustomersQuery } from '@/app/apiSlices/finalCustomerApiSlice'
import { selectAllProjectCodes, useGetAllProjectCodesQuery } from '@/app/apiSlices/projectCodeApiSlice'
import Button from '@/app/components/main/Button'
import PageTitle from '@/app/components/main/PageTitle'
import SearchContainer from '@/app/components/main/SearchContainer'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import Loading from '@/app/features/loading/Loading'
import AllProjectCodesTable from '@/app/features/projectCodes/AllProjectCodesTable'
import usePageTitle from '@/app/hooks/usePageTitle'
import { codeMap } from '@/app/lib/constants'
import { FinalCustomerObject, ProjectCodeObject } from '@/app/lib/interfaces'
import { EntityId } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const ProjectCodes = () => {
    usePageTitle('کد پروژه')

    const {
        data,
        isLoading: projectCodesLoading,
        isSuccess, 
        isError,
    } = useGetAllProjectCodesQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    })

    const {
        isLoading: finalCustomersLoading,
      } = useGetAllFinalCustomersQuery(undefined, { 
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
      }) 

    const allProjectCodes: ProjectCodeObject[] = useSelector(state => selectAllProjectCodes(state) as ProjectCodeObject[])
    const allFinallCustomers: FinalCustomerObject[] = useSelector(state => selectAllFinalCustomers(state) as FinalCustomerObject[])

    const[isNewProjectCode, setIsNewProjectCode] = useState<boolean>(false)
    const [projectCodeId, setProjectCodeId] = useState<string | any | EntityId>('')

    const handleNewProjectCodeModal = () => setIsNewProjectCode(!isNewProjectCode)


    if(projectCodesLoading || finalCustomersLoading) return <Loading /> 
    // console.log("allProjectCodes", allProjectCodes)
    return (
        <>
            <PageTitle name={'کدهای پروژه'} />

            <div className="flex items-center justify-between gap-3">
            <SearchContainer />
            <Button 
                onClickHandler={handleNewProjectCodeModal}
                title="کد پروژه جدید"
            />
            </div>

            <AllProjectCodesTable
                allProjectCodes={allProjectCodes}
                allFinallCustomers={allFinallCustomers}
                projectCodeId={projectCodeId}
                setProjectCodeId={setProjectCodeId}
            />

            {isNewProjectCode &&
                <CreateUpdateModal
                    type='newProjectCode'
                    handleModal={handleNewProjectCodeModal}
                />            
            }
        </>
    )
}

export default ProjectCodes