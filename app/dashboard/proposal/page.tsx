"use client"
import { selectAllInitialCustomers, useGetAllInitialCustomersQuery } from '@/app/apiSlices/initialCustomersApiSlice'
import { selectAllProposals, selectProposalById, useGetAllProposalsQuery } from '@/app/apiSlices/proposalApiSlice'
import { selectAllUsers, useGetUsersQuery } from '@/app/apiSlices/usersApiSlice'
import Button from '@/app/components/main/Button'
import PageTitle from '@/app/components/main/PageTitle'
import SearchContainer from '@/app/components/main/SearchContainer'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import { useSocket } from '@/app/config/state-config/SocketContext'
import Loading from '@/app/features/loading/Loading'
import AllProposalsTable from '@/app/features/proposal/AllProposalsTable'
import useAuth from '@/app/hooks/useAuth'
import usePageTitle from '@/app/hooks/usePageTitle'
import { InitialCustomerObject, ProposalObject, UserObject } from '@/app/lib/interfaces'
import { EntityId } from '@reduxjs/toolkit'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Proposal = () => {
  usePageTitle('پروپوزال')

  const { isAdmin, isMaster, isProjectManager } = useAuth()
  const { setupSocket } = useSocket()

  useEffect(() => {
    setupSocket()
  }, [])

  const {
    isLoading,
    isError,
  } = useGetAllProposalsQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  useGetAllInitialCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
})

  useGetUsersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const allProposals: ProposalObject[] = useSelector(state => selectAllProposals(state) as ProposalObject[])
  const allInitialCustomers: InitialCustomerObject[] = useSelector(state => selectAllInitialCustomers(state) as InitialCustomerObject[])
  const allUsers: UserObject[] = useSelector(state => selectAllUsers(state) as UserObject[])
  const [isNewProposal, setIsNewProposal] = useState<boolean>(false)
  const [data, setData] = useState<ProposalObject[]>([])
  const [proposalId, setProposalId] = useState<string | any | EntityId>('')
  const proposal: ProposalObject  = useSelector(state => selectProposalById(state, proposalId) as ProposalObject)

  const handleNewProposalModal = () => setIsNewProposal(!isNewProposal)

  useEffect(() => {
    setData(allProposals)
  }, [allProposals, allInitialCustomers])

console.log("allUsers", allUsers)
  if(isLoading || !allInitialCustomers[0] || !allUsers[0]) return <Loading />
  if(isError) return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <p className='text-xl'>
        هیچ پروپوزالی وجود ندارد
      </p>

      <p>
        برای ایجاد پروپوزال جدید
        <Link href={'/dashboard/billboard/plans/createplan'}>
          <span className='text-cyan-300'>
            کلیک کنید
          </span>
        </Link>
      </p>
    </div>
  )

  return (
    <>
      <PageTitle name={'پروپوزال'} />

      <div className="flex items-center justify-between gap-3">
          <SearchContainer />

          {(isAdmin || isMaster) &&
              <Button
                  onClickHandler={handleNewProposalModal}
                  title="پروپوزال جدید"
              />
          }
      </div>

      <AllProposalsTable
        data={data}
        allInitialCustomers={allInitialCustomers}
        allUsers={allUsers}
        proposal={proposal}
        setProposalId={setProposalId}
      />

      {
        isNewProposal &&
        <CreateUpdateModal
          type={'newProposal'}
          handleModal={handleNewProposalModal}
        />
      }
  </>
  )
}

export default Proposal
