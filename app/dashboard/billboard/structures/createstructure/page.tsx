"use client"
import NewStructureForm from '@/app/features/structures/NewStructureForm'
import PageTitle from '@/app/components/main/PageTitle'
import usePageTitle from '@/app/hooks/usePageTitle'

const CreateStructure = () => {
  usePageTitle('ایجاد سازه جدید')

  return ( 
    <main className="min-h-screen">
      <PageTitle name={'ایجاد سازه جدید'} />
      <NewStructureForm />
    </main>
  )
}

export default CreateStructure