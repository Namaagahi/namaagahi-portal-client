"use client"
import { selectAllStructures, useGetStructuresQuery } from '@/app/features/structures/structuresApiSlice'
import { selectBoxById, useGetAllBoxesQuery } from '@/app/features/boxes/boxesApiSlice'
import UnderConstruction from '@/app/components/main/UnderConstruction'
import SingleBoxHeading from '@/app/features/boxes/SingleBoxHeading'
import { BoxObject, StructureObject } from '@/app/lib/interfaces'
import { boxStructureHeadings } from '@/app/lib/constants'
import { variableCostNames2 } from '@/app/lib/constants'
import PageTitle from '@/app/components/main/PageTitle'
import Tooltip from '@/app/components/main/Tooltip'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import useAuth from '@/app/hooks/useAuth'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
const Loading = dynamic(
    () => import('@/app/features/loading/Loading'),
    { ssr: false }
  )
const Table = dynamic(
    () => import('@/app/components/main/Table'),
    { ssr: false }
  )

const SingleBox = () => {

    const { isAdmin } = useAuth()
    const { id } = useParams()
    const [newBox, setNewBox] = useState<any>({})

    const {
        data: boxes
    } = useGetAllBoxesQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    const {
        data: structures
    } = useGetStructuresQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    const box: BoxObject | any = useSelector(state => selectBoxById(state as BoxObject , id))
    const allStructures: StructureObject[] = useSelector(state => selectAllStructures(state))

    console.log("BOX", box)

    function formatNumber(number: number, separator: string): string {
        const options = {
          useGrouping: true,
          minimumFractionDigits: 0,
        }
        return number.toLocaleString(undefined, options).replace(/,/g, separator);
      }

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
                    if(varCost.name === varName) return stucture['myCustomCost'][varName] = varCost.figures.periodCost

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
      }, [box])

    if(!newBox.id) return <Loading />
    // console.log("BOX", newBox)

    return ( 
        <>
            <main className='min-h-screen w-full'>
                <PageTitle name={`باکس ${newBox.name}`} />
                <div className="flex flex-col rounded-lg min-h-[750px] mb-48 bg-slate-300 dark:bg-slate-100 overflow-hidden shadow-md">
                    <div className=" h-full duration-1000">
                        <div className=" p-4 h-full bg-gray-100 overflow-hidden">
                            <SingleBoxHeading 
                                box={newBox}
                            />
                            <small className=" mt-2 text-black px-2">خرید</small>
                            <div className="max-h-[30%] bg-rose-200 overflow-y-auto text-black w-full">
                                <Table  
                                    tableHeadings={boxStructureHeadings}
                                    tableContent={
                                        newBox.structures.map((structure: any, index: number) => {
                                            const str = allStructures.find(rawStructure => rawStructure.id === structure.structureId)
                                            return( 
                                                <>
                                                <tr key={str?._id}>                
                                                    <td className="px-1 text-center py-4">{index + 1}</td>
                                                    <td className="px-6 py-4">{str?.name}</td>
                                                    <td className="px-2 py-4">{structure.marks.name}</td>
                                                    <td className="px-6 py-4">{str?.location.path}</td>
                                                    <Tooltip
                                                        tooltipText={str?.location.address}
                                                        orientation='left'
                                                    >
                                                        <td className="px-2 py-4">{`${str?.location.address.slice(0,10)}...`}</td>
                                                    </Tooltip>
                                                    <td className="px-6 py-4">{structure.duration.startDate}</td>
                                                    <td className="px-6 py-4">{structure.duration.endDate}</td>
                                                    <td className="px-6 py-4">{structure.duration.diff}</td>
                                                    <td className="px-6 py-4">{structure.marks.markOptions.style}</td>
                                                    <td className="px-6 py-4">{structure.marks.markOptions.face}</td>
                                                    <td className="px-6 py-4">{structure.marks.markOptions.length}</td>
                                                    <td className="px-6 py-4">{structure.marks.markOptions.width}</td>
                                                    <td className="px-6 py-4">{structure.marks.markOptions.printSize}</td>
                                                    <td className="px-6 py-4">{structure.marks.markOptions.docSize}</td>
                                                    <td className="px-6 py-4 bg-rose-300 text-gray-600">{formatNumber(structure.costs.fixedCosts.squareCost, ',')}</td>
                                                    <td className="px-6 py-4 bg-rose-300 text-gray-600">{formatNumber(structure.costs.fixedCosts.dailyCost, ',')}</td>
                                                    <td className="px-6 py-4 bg-rose-300 text-gray-600">{formatNumber(structure.costs.fixedCosts.monthlyCost, ',')}</td>
                                                    <td className="px-6 py-4 bg-rose-300 text-gray-600 font-bold">{formatNumber(structure.costs.fixedCosts.periodCost, ',')}</td>
                                                    {
                                                        variableCostNames2.map((varName) => {
                                                           return <td className="px-6 py-4">{formatNumber(structure.myCustomCost[varName], ',')}</td>
                                                        
                                                        })
                                                    }
                                                </tr>
                                 
                                                </>
                                                )
                                        })
                                    }
                                />
                            </div>

                            <small className=" mt-2 text-black px-2">فروش</small>
                                <UnderConstruction 
                                    desc='این بخش از پنل مربوط به جدول فروش به تفکیک سازه ها و جداول تجمیعی سود و زیان است و به زودی اضافه خواهد شد.'
                                />  
                            {/* <div className="max-h-[30%] bg-lime-200 overflow-y-auto text-black">
                                <Table 
                                    tableHeadings={plannedStructureHeadings}
                                    tableContent={
                                    <>                
                                        <td className="px-6 py-4">ST1000</td>
                                        <td className="px-6 py-4">PL1000</td>
                                        <td className="px-6 py-4">دیپوینت</td>
                                        <td className="px-6 py-4">مدرس</td>
                                        <td className="px-6 py-4">18.000.000</td>
                                        <td className="px-6 py-4">1402/05/15</td>
                                        <td className="px-6 py-4">1402/06/20</td>
                                    </>}
                                />
                            </div> */}

                            <small className=" mt-2 text-black px-2">سود/ زیان جزئی </small>
                            {/* <div className="max-h-[30%] bg-slate-200 overflow-y-auto text-black">
                                <Table 
                                    tableHeadings={structureRevenueHeadings}
                                    tableContent={
                                    <>                
                                        <td className="px-6 py-4">ST1000</td>
                                        <td className="px-6 py-4">مدرس</td>
                                        <td className="px-6 py-4">17.000.000</td>
                                        <td className="px-6 py-4">18.000.000</td>
                                        <td className="px-6 py-4">1.000.000</td>
                                    </>}
                                />
                            </div> */}

                            <small className=" mt-2 text-black px-2">سود/ زیان تجمیعی </small>
                            {/* <div className="max-h-[30%] bg-slate-200 overflow-y-auto text-black">
                                <Table 
                                    tableHeadings={boxRevenueHeadings}
                                    tableContent={
                                    <>                
                                        <td className="px-6 py-4">17.000.000</td>
                                        <td className="px-6 py-4">18.000.000</td>
                                        <td className="px-6 py-4">1.000.000</td>
                                    </>}
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SingleBox