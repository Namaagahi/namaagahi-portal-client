"use client"
import { selectAllStructures } from '@/app/features/structures/structuresApiSlice'
import UnderConstruction from '@/app/components/main/UnderConstruction'
import { selectBoxById } from '@/app/features/boxes/boxesApiSlice'
import { BoxObject, StructureObject } from '@/app/lib/interfaces'
import { boxStructureHeadings } from '@/app/lib/constants'
import PageTitle from '@/app/components/main/PageTitle'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
const Loading = dynamic(
    () => import('@/app/features/loading/Loading'),
    { ssr: false }
  )
const Table = dynamic(
    () => import('@/app/components/main/Table'),
    { ssr: false }
  )

const SingleBox = () => {

    const { id } = useParams()

    const box: BoxObject | any = useSelector(state => selectBoxById(state, id))
    const allStructures: StructureObject[] = useSelector(state => selectAllStructures(state))

    function formatNumber(number: number, separator: string): string {
        const options = {
          useGrouping: true,
          minimumFractionDigits: 0,
        }
        return number.toLocaleString(undefined, options).replace(/,/g, separator);
      }

      console.log("BOX", box)   
    
    if(!box) return <Loading />

    return ( 
        <main className='min-h-screen'>
            <PageTitle name={`باکس ${box.name}`} />
            <div className="flex flex-col rounded-lg w-full min-h-[750px] mb-48 bg-slate-300 dark:bg-slate-100 overflow-hidden shadow-md ">
                <div className="  w-full h-full duration-1000">
                    <div className=" p-4  w-full h-full bg-gray-100 overflow-hidden">
                        <div className="p-2 h-[15%] backdrop-blur bg-black/50 bg-black dark:bg-[#2563EB]/80 flex items-center justify-between px-2 text-white font-bold">
                            <div className="flex flex-col gap-2">
                                {box.mark.name === 'buyShort'?
                                <p>خرید کوتاه مدت</p>
                                : box.mark.name === 'buyLong'?
                                <p>خرید بلند مدت</p>
                                : <p>مزایده ای</p>}

                                <p>{box.name}</p>
                            </div>

                            {
                            box.mark.name === 'buyShort' && 
                                <div className="flex flex-col gap-2">
                                    <p>{box.mark.markOptions.projectNumber}</p>
                                    <p>{box.mark.markOptions.brand}</p>
                                </div>
                            }

                            <div className="flex flex-col gap-2 text-sm">
                                <p>{box.duration.startDate}</p>
                                <p>{box.duration.endDate}</p>
                                <p>مدت قرارداد: {box.duration.diff} روز</p>
                            </div>
                        </div>
                        
                        {!box.structures?.length && <p className='text-black'>باکس سازه ندارد</p>} 

                        <small className=" mt-2 text-black px-2">خرید</small>
                        <div className="max-h-[30%] bg-rose-200 overflow-y-auto text-black">
                            <Table 
                                tableHeadings={boxStructureHeadings}
                                tableContent={
                                    box.structures.map((structure: any, index: number) => {
                                        const str = allStructures.find(rawStructure => rawStructure.id === structure.structureId)
                                        return(
                                            <tr key={structure.structureId}>                
                                                <td className="px-6 py-4">{str?.name}</td>
                                                <td className="px-6 py-4">{structure.marks.name}</td>
                                                <td className="px-6 py-4">{str?.location.path}</td>
                                                <td className="px-6 py-4">{str?.location.address}</td>
                                                <td className="px-6 py-4">{structure.duration.startDate}</td>
                                                <td className="px-6 py-4">{structure.duration.endDate}</td>
                                                <td className="px-6 py-4">{structure.duration.diff}</td>
                                                <td className="px-6 py-4">{structure.marks.markOptions.style}</td>
                                                <td className="px-6 py-4">{structure.marks.markOptions.face}</td>
                                                <td className="px-6 py-4">{structure.marks.markOptions.length}</td>
                                                <td className="px-6 py-4">{structure.marks.markOptions.width}</td>
                                                <td className="px-6 py-4">{structure.marks.markOptions.printSize}</td>
                                                <td className="px-6 py-4">{structure.marks.markOptions.docSize}</td>
                                                <td className="px-6 py-4">{formatNumber(structure.costs.fixedCosts.squareCost, ',')}</td>
                                                <td className="px-6 py-4">{formatNumber(structure.costs.fixedCosts.monthlyCost, ',')}</td>
                                            </tr>
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
    )
}

export default SingleBox