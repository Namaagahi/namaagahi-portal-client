"use client"
import PageTitle from '@/app/components/main/PageTitle'
import NewStructureForm from '@/app/features/structures/NewStructureForm'


const CreateStructure = () => {

 

  return ( 
    <main className="min-h-screen">
      <PageTitle name={'ایجاد سازه جدید'} />
      <NewStructureForm />
    </main>
  )
}

export default CreateStructure