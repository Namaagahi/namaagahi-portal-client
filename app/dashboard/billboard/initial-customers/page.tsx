"use client"
import Button from '@/app/components/main/Button'
import PageTitle from '@/app/components/main/PageTitle'
import CreateUpdateModal from '@/app/components/modals/CreateUpdateModal'
import InitialCustomer from '@/app/features/initialCustomers/InitialCustomer'
import { useGetAllInitialCustomersQuery } from '@/app/features/initialCustomers/initialCustomersApiSlice'
import useAuth from '@/app/hooks/useAuth'
import { initialCustomerTableHeadings } from '@/app/lib/constants'
import dynamic from 'next/dynamic'
import { useState } from 'react'
const Table = dynamic(
  () => import('@/app/components/main/Table'),
  { ssr: false }
)
const Loading = dynamic(
    () => import('@/app/features/loading/Loading'),
    { ssr: false }
  )

const InitialCustomers = () => {
    
    const { isAdmin } = useAuth()
    
    const {
        data: initialCustomers, 
        isSuccess,
      } = useGetAllInitialCustomersQuery(undefined, { 
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
      }) 

    const [isNewInitialCustomer, setIsNewInitialCustomer] = useState(false)

    const handleNewInitialCustomerModal = () => setIsNewInitialCustomer(!isNewInitialCustomer)

        const { ids } = initialCustomers ?? []

        const initialCustomerTableContent = ids?.length && ids.map((initialCustomerId: string) => <InitialCustomer key={initialCustomerId} initialCustomerId={initialCustomerId} />)

        return (
            <>            
                <main className="min-h-screen">
                    <PageTitle name={'مشتریان اولیه'} />
                    {isSuccess ?
                      <Table 
                          tableContent = {initialCustomerTableContent}
                          tableHeadings = {initialCustomerTableHeadings}
                      />
                      :
                      <p>هیچ مشتری اولیه ای تعریف نشده است</p>
                    }
                    <Button 
                      onClickHandler={handleNewInitialCustomerModal}
                      title="مشتری اولیه جدید"
                      />
                </main>
                {
                  isNewInitialCustomer && 
                    <CreateUpdateModal
                      type={'newInitialCustomer'}
                      handleModal={handleNewInitialCustomerModal}
                    />
                }
            </>
        )
    }

export default InitialCustomers 