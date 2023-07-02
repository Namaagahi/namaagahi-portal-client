"use client"
import NewStructureForm from '@/app/features/structures/NewStructureForm'
import PageTitle from '@/app/components/main/PageTitle'
import { useSelector } from 'react-redux'
import { selectAllStructures } from '@/app/features/structures/structuresApiSlice'

const CreateStructure = () => {
  const structures = useSelector(state => selectAllStructures(state))

  console.log("ALL STRUCTURES",structures)
  return ( 
    <main className="min-h-screen">
      <PageTitle name={'ایجاد سازه جدید'} />
      <NewStructureForm />
    </main>
  )
}

export default CreateStructure