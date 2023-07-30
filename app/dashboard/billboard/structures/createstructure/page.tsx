"use client"
import { selectAllStructures } from '@/app/features/structures/structuresApiSlice'
import NewStructureForm from '@/app/features/structures/NewStructureForm'
import PageTitle from '@/app/components/main/PageTitle'
import { useSelector } from 'react-redux'

const CreateStructure = () => {

  return ( 
    <main className="min-h-screen">
      <PageTitle name={'ایجاد سازه جدید'} />
      <NewStructureForm />
    </main>
  )
}

export default CreateStructure