"use client"
import dynamic from 'next/dynamic'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const NewStructureForm = dynamic(
  () => import('@/app/features/structures/NewStructureForm'),
  { ssr: false }
)

const CreateStructure = () => {

 

  return ( 
    <main className="min-h-screen">
      <PageTitle name={'ایجاد سازه جدید'} />
      <NewStructureForm />
    </main>
  )
}

export default CreateStructure