"use client"
import { selectAllStructures, useGetStructuresQuery } from '@/app/apiSlices/structuresApiSlice'
import { selectBoxById, useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import { BoxObject, BoxStructure, StructureObject } from '@/app/lib/interfaces'
import UnderConstruction from '@/app/components/main/UnderConstruction'
import SingleBoxHeading from '@/app/features/boxes/SingleBoxHeading'
import TableComponent from '@/app/components/table/TableComponent'
import { variableCostNames2 } from '@/app/lib/constants'
import PageTitle from '@/app/components/main/PageTitle'
import { useEffect, useMemo, useState } from 'react'
import Tooltip from '@/app/components/main/Tooltip'
import { ColumnDef } from '@tanstack/react-table'
import { useParams } from 'next/navigation'
import useAuth from '@/app/hooks/useAuth'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
const Loading = dynamic(
    () => import('@/app/features/loading/Loading'),
    { ssr: false }
  )

const SingleBox = () => { 

    const { isAdmin, isMediaManager } = useAuth()
    const { id } = useParams()
    const [newBox, setNewBox] = useState<any>({})
    const [data, setData] = useState<BoxStructure | any>([])
    const [loading, setLoading] = useState(true)

    useGetAllBoxesQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    useGetStructuresQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    const box: BoxObject | any = useSelector(state => selectBoxById(state as BoxObject , id))
    const allStructures: StructureObject[] = useSelector(state => selectAllStructures(state))

    function formatNumber(number: number, separator: string): string {
        const options = {
          useGrouping: true,
          minimumFractionDigits: 0,
        }
        return number?.toLocaleString(undefined, options).replace(/,/g, separator);
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
        setLoading(false)
      }, [box])

      useEffect(() =>{
        if(newBox) setData(newBox?.structures)
      }, [newBox])

    const columns = useMemo<ColumnDef<BoxStructure, any>[]>(() => {
        return(
        [
            {
            header: ' ',
            columns: [
                {
                accessorKey: "_id",
                accessorFn: row => row.id,
                id: '_id',
                cell: info => null,
                header: () => null,
                },
                {
                accessorFn: row => row.structureId,
                id: 'کد سامانه',
                cell: info => <div>{allStructures.find(rawStructure => rawStructure.id === info.getValue())?.name}</div>        ,
                header: () => <span>کد سامانه</span>,
                },
                {
                accessorFn: row => row.marks.name,
                id: 'نوع سازه',
                cell: info => info.getValue(),
                header: () => <span>نوع سازه</span>,
                },
                {
                accessorFn: row => row.structureId,
                id: 'مسیر',
                cell: info => <div>{allStructures.find(rawStructure => rawStructure.id === info.getValue())?.location.path}</div>,
                header: () => <span>مسیر</span>,
                },
                {
                accessorFn: row => row.structureId,
                id: 'آدرس',
                cell: info => 
                    <Tooltip tooltipText={allStructures.find(rawStructure => rawStructure.id === info.getValue())?.location.address} orientation='left'>
                        <div>{(allStructures.find(rawStructure => rawStructure.id === info.getValue())?.location.address)?.slice(0,8)}...</div>
                    </Tooltip>,
                header: () => <span>آدرس</span>,
                },
                {
                accessorFn: row => row.duration.startDate,
                id: 'تاریخ شروع',
                cell: info => info.getValue(),
                header: () => <span>تاریخ شروع</span>,
                },
                {
                accessorFn: row => row.duration.endDate,
                id: 'تاریخ پایان',
                cell: info => info.getValue(),
                header: () => <span>تاریخ پایان</span>,
                },
                {
                accessorFn: row => row.duration.diff,
                id: 'طول دوره',
                cell: info => info.getValue(),
                header: () => <span>طول دوره</span>,
                },
                {
                accessorFn: row => row.marks.markOptions.style,
                id: 'تیپ',
                cell: info => info.getValue(),
                header: () => <span>تیپ</span>,
                },
                {
                accessorFn: row => row.marks.markOptions.face,
                id: 'وجه',
                cell: info => info.getValue(),
                header: () => <span>وجه</span>,
                },
                {
                accessorFn: row => row.marks.markOptions.length,
                id: 'طول',
                cell: info => info.getValue(),
                header: () => <span>طول</span>,
                },
                {
                accessorFn: row => row.marks.markOptions.width,
                id: 'عرض',
                cell: info => info.getValue(),
                header: () => <span>عرض</span>,
                },
                {
                accessorFn: row => row.marks.markOptions.printSize,
                id: 'متراژ چاپ',
                cell: info => info.getValue(),
                header: () => <span>متراژ چاپ</span>,
                },
                {
                accessorFn: row => row.marks.markOptions.docSize,
                id: 'متراژ واقعی',
                cell: info => info.getValue(),
                header: () => <span>متراژ واقعی</span>,
                },
                {
                accessorFn: row => row.costs.fixedCosts.squareCost,
                id: 'تمام شده متر مربع',
                cell: info => {
                    const squareCost = info.getValue()
                    return formatNumber(squareCost, ',') 
                },
                header: () => <span>تمام شده متر مربع</span>,
                },
                {
                accessorFn: row => row.costs.fixedCosts.dailyCost,
                id: 'تمام شده روزانه',
                cell: info => {
                    const dailyCost = info.getValue()
                    return (
                        (isAdmin || isMediaManager) ?
                        formatNumber(dailyCost, ',') : <p className='text-xs'>محدودیت دسترسی</p>
                    )
                },
                header: () => <span>تمام شده روزانه</span>,
                },
                {
                accessorFn: row => row.costs.fixedCosts.monthlyCost,
                id: 'تمام شده ماهیانه',
                cell: info => {
                    const monthlyCost = info.getValue()
                    return (
                        (isAdmin || isMediaManager) ?
                        formatNumber(monthlyCost, ',') : <p className='text-xs'>محدودیت دسترسی</p>
                    )
                },
                header: () => <span>تمام شده ماهیانه</span>,
                },
                {
                accessorFn: row => row.costs.fixedCosts.periodCost,
                id: 'تمام شده دوره',
                cell: info => {
                    const periodCost = info.getValue()
                    return (
                        (isAdmin || isMediaManager) ?
                        formatNumber(periodCost, ',') : <p className='text-xs'>محدودیت دسترسی</p>
                    )
                },
                header: () => <span>تمام شده دوره</span>,
                },
                {
                accessorFn: row => row.myCustomCost,
                id: `${variableCostNames2[0]}`,
                cell: info => {
                    const myCustomCost = info.getValue()
                    return formatNumber(myCustomCost[variableCostNames2[0]], ',')
                },
                header: () => <span>{variableCostNames2[0]}</span>,
                },
                {
                accessorFn: row => row.myCustomCost,
                id: `${variableCostNames2[1]}`,
                cell: info => {
                    const myCustomCost = info.getValue()
                    return formatNumber(myCustomCost[variableCostNames2[1]], ',')
                },
                header: () => <span>{variableCostNames2[1]}</span>,
                },
                {
                accessorFn: row => row.myCustomCost,
                id: `${variableCostNames2[2]}`,
                cell: info => {
                    const myCustomCost = info.getValue()
                    return formatNumber(myCustomCost[variableCostNames2[2]], ',')
                },
                header: () => <span>{variableCostNames2[2]}</span>,
                },
                {
                accessorFn: row => row.myCustomCost,
                id: `${variableCostNames2[3]}`,
                cell: info => {
                    const myCustomCost = info.getValue()
                    return formatNumber(myCustomCost[variableCostNames2[3]], ',')
                },
                header: () => <span>{variableCostNames2[3]}</span>,
                },
                {
                accessorFn: row => row.myCustomCost,
                id: `${variableCostNames2[4]}`,
                cell: info => {
                    const myCustomCost = info.getValue()
                    return formatNumber(myCustomCost[variableCostNames2[4]], ',')
                },
                header: () => <span>{variableCostNames2[4]}</span>,
                },
                {
                accessorFn: row => row.costs.dailyVariableCost,
                id: 'جمع هزینه سربار روزانه',
                cell: info => {
                    const dailyVariableCost = info.getValue()
                    return (
                        (isAdmin || isMediaManager) ?
                        formatNumber(dailyVariableCost, ',') : <p className='text-xs'>محدودیت دسترسی</p>
                    ) 
                },
                header: () => <span>جمع هزینه سربار روزانه</span>,
                },
                {
                accessorFn: row => row.costs.totalDailyCost,
                id: 'هزینه روزانه کل',
                cell: info => {
                    const totalDailyCost = info.getValue()
                    return (
                        (isAdmin || isMediaManager) ?
                        formatNumber(totalDailyCost, ',') : <p className='text-xs'>محدودیت دسترسی</p>
                    ) 
                },
                header: () => <span>هزینه روزانه کل</span>,
                },
                {
                accessorFn: row => row.costs.totalMonthlyCost,
                id: 'هزینه ماهیانه کل',
                cell: info => {
                    const totalMonthlyCost = info.getValue()
                    return (
                        (isAdmin || isMediaManager) ?
                        formatNumber(totalMonthlyCost, ',') : <p className='text-xs'>محدودیت دسترسی</p>
                    )
                },
                header: () => <span>هزینه ماهیانه کل</span>,
                },
                {
                accessorFn: row => row.costs.totalPeriodCost,
                id: 'هزینه دوره کل',
                cell: info => {
                    const totalPeriodCost = info.getValue()
                    return (
                        (isAdmin || isMediaManager) ?
                        formatNumber(totalPeriodCost, ',') : <p className='text-xs'>محدودیت دسترسی</p>
                    )
                },
                header: () => <span>هزینه دوره کل</span>,
                },
            ],
            }
        ]
        )
    },
    []
    )

    if(!data?.length || !newBox?.structures || !box || !allStructures || loading) return <Loading />

    return ( 
        <>
            <main className='min-h-screen w-full'>
                <PageTitle name={`باکس ${newBox.name}`} />
                <div className="flex flex-col rounded-lg min-h-[750px] mb-48 bg-slate-300 dark:bg-slate-100 overflow-hidden shadow-md">
                    <div className=" h-full duration-1000">
                        <div className=" p-4 h-full bg-gray-100 overflow-hidden">
                            <SingleBoxHeading box={newBox} />
                            <small className=" mt-2 text-black px-2">خرید</small>
                            <div className="max-h-[30%] bg-rose-200 dark:bg-red-900 overflow-y-auto p-2 w-full">
                                <TableComponent 
                                    columns={columns}
                                    data={data}
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