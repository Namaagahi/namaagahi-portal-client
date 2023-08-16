"use client"
import { selectAllStructures, useGetStructuresQuery, useUpdateStructureMutation } from '@/app/apiSlices/structuresApiSlice'
import { selectBoxById, useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import { BoxObject, BoxStructure, StructureObject } from '@/app/lib/interfaces'
import UnderConstruction from '@/app/components/main/UnderConstruction'
import SingleBoxHeading from '@/app/features/boxes/SingleBoxHeading'
import { variableCostNames2 } from '@/app/lib/constants'
import PageTitle from '@/app/components/main/PageTitle'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import SingleBoxTable from '@/app/features/boxes/SingleBoxTable'
const Loading = dynamic(
    () => import('@/app/features/loading/Loading'),
    { ssr: false }
  )

const SingleBox = () => { 

    const { id } = useParams()
    const [newBox, setNewBox] = useState<any>({})
    const [structures, setStructures] = useState<StructureObject[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useGetAllBoxesQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    useGetStructuresQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    const [updateStructure, { isError:iserror, error: Error }] = useUpdateStructureMutation()
    const box: BoxObject = useSelector(state => selectBoxById(state as BoxObject , id) as BoxObject)
    const allStructures: StructureObject[] = useSelector(state => selectAllStructures(state) as StructureObject[])

    // useEffect(()=>{ 
    //     if(box?.duration.endDate < new Date().getTime()) {
    //         allStructures?.forEach(async(structure: StructureObject) => {
    //           if(structure.isChosen || structure.parent.length) {
    //             await updateStructure({
    //               id: structure.id,
    //               userId: structure.userId,
    //               name: structure.name,
    //               location: structure.location,
    //               isAvailable: structure.isAvailable,
    //               isChosen: false,
    //               parent: ''
    //             })
    //           }
    //         })
    //     }
    // }, [])

    const calcVariableCosts = () => {
        const clone: any = []
        box?.structures.forEach((item: any) => {
            const thisName = allStructures.find(rawStructure => rawStructure.id === item.structureId)?.name ?? ''
            clone.push({...item, ['myCustomCost'] : {}, ['name']: thisName})
        })
        clone.forEach((stucture: any) => {
            stucture.costs.variableCosts.forEach((varCost:any) => {
                variableCostNames2.forEach(varName => {
                    if(stucture['myCustomCost'][varName]) return
                    if(!stucture['myCustomCost'][varName]) stucture['myCustomCost'][varName] = 0
                    if(varCost.name === varName) return stucture['myCustomCost'][varName] = varCost.figures.monthlyCost

                })
            })
        })
        clone.sort((a: any, b: any) => {
            if(Number(a.name.slice(1,5)) > Number(b.name.slice(1,5))) return 1
            if(Number(a.name.slice(1,5)) < Number(b.name.slice(1,5))) return -1
            return 0
        })
        const boxClone = {...box}
        boxClone['structures'] = [...clone]
        setNewBox(boxClone)
    }

      useEffect(() => {
        if(box) calcVariableCosts()
        if(allStructures) setStructures(allStructures)
        setLoading(false)
      }, [box, allStructures])

      console.log("newBox", newBox)  

    if(!newBox || !box || !structures[0] || loading) return <Loading />

    return (  
        <>
            <main className='min-h-screen w-full'>
                <PageTitle name={`باکس ${newBox.name}`} />
                <div className="flex flex-col rounded-lg min-h-[750px] mb-48 bg-slate-300 dark:bg-slate-100 overflow-hidden shadow-md">
                    <div className=" h-full duration-1000">
                        <div className=" p-4 h-full bg-gray-100 overflow-hidden">
                            <SingleBoxHeading box={newBox} />
                            <small className=" mt-2 text-black px-2">خرید</small>
                            <div className="max-h-[30%] bg-rose-200 dark:bg-[#7d332e] overflow-y-auto p-2 w-full">
                                <SingleBoxTable
                                    data={newBox.structures}
                                    allStructures={structures}
                                />
                            </div>

                            <small className=" mt-2 text-black px-2">فروش</small>
                                <UnderConstruction 
                                    desc='این بخش از پنل مربوط به جدول فروش به تفکیک سازه ها و جداول تجمیعی سود و زیان است و به زودی اضافه خواهد شد.'
                                />  

                            <small className=" mt-2 text-black px-2">سود/ زیان جزئی </small>

                            <small className=" mt-2 text-black px-2">سود/ زیان تجمیعی </small>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SingleBox