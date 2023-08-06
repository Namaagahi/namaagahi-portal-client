"use client"
import NewStructureForm from '@/app/features/structures/NewStructureForm'
import PageTitle from '@/app/components/main/PageTitle'

const CreateStructure = () => {

  return ( 
    <main className="min-h-screen">
      <PageTitle name={'ایجاد سازه جدید'} />
      <NewStructureForm />
    </main>
  )
}

export default CreateStructure