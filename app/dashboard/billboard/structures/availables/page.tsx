'use client'
import { StructureObject, BoxObject, BoxStructure, PlanObject, StructurePlanObject } from '@/app/lib/interfaces'
import {  selectAllStructures ,useGetStructuresQuery } from '@/app/apiSlices/structuresApiSlice'
import { selectAllBoxes, useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import { selectAllPlans, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import PageTitle from '@/app/components/main/PageTitle'
import Loading from '@/app/features/loading/Loading'
import usePageTitle from '@/app/hooks/usePageTitle'
import { FaFilePdf } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import domtoimage from 'dom-to-image'
import moment from 'jalali-moment'
import {jsPDF} from 'jspdf'
import SearchContainer from '@/app/components/main/SearchContainer'

type InitialStructureDurations = {
    [key:string]: {
    sellStart: number
    sellEnd:number
    diff?:number
    }[]
}

type StructureDurations = {
    [key:string]: {
    start: number
    end:number
    }[]
}

const Availables = () => {
    usePageTitle('سازه های خالی')

    const { 
        isLoading,
        isError,
      } = useGetAllPlansQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
      })

      useGetStructuresQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    useGetAllBoxesQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    const allBoxes: BoxObject[] = useSelector(state => selectAllBoxes(state) as BoxObject[])
    const allPlans: PlanObject[] = useSelector(state => selectAllPlans(state) as PlanObject[])
    const allStructures: StructureObject[] = useSelector(state => selectAllStructures(state) as StructureObject[])

    const [startDate, setStartDate] = useState<number>(new Date().getTime() / 1000)
    const [endDate, setEndDate] = useState<number>(new Date().getTime() / 1000)
    const [filtered, setFiltetred] = useState({
        initial: {} as StructureDurations,
        edited: {} as StructureDurations
    })
    const [paths, setPaths] = useState<{name:string, isSelected:boolean}[]>([])

    if(!paths[0] && allStructures[0]) {
        const jsonObject = allStructures.map(item => JSON.stringify({
            name:item.location.path,
            isSelected:false
        }))
        const uniquePaths = Array.from(new Set(jsonObject)).map(item => JSON.parse(item))
        setPaths(uniquePaths)
    }

    const filterStructures = (startDate:number, endDate:number) => {
        const structuresBox: BoxStructure[] = []
        allBoxes.forEach(box => {
            box.structures.forEach(structure => {
                if(structure.duration.endDate >= startDate) structuresBox.push(structure)
            })
        })
        const structuresPlans:StructurePlanObject[] = []
        allPlans.forEach(plan => {
            if(plan.status === 'done') {
                plan.structures.forEach(structure => {
                    if(structure.structureRecord.duration.endDate >= startDate) structuresPlans.push(structure)
                })
            }
        })

        if(!structuresBox[0] && !structuresPlans[0]) return {}
    
        const initialDurations:InitialStructureDurations = {}
        structuresPlans.forEach(structure => {
            if(initialDurations[structure.structureId]) return initialDurations[structure.structureId].push({...structure.duration})
            initialDurations[structure.structureId] = [{...structure.duration}]
        })
    
        const obj2:StructureDurations = {}
        Object.entries(initialDurations).forEach(([key, value]) => {
            value.forEach((item, index, ref) => {
                if(!obj2[key]) obj2[key] = [{start: startDate, end: item.sellStart}]
                if(ref[index + 1]) return obj2[key].push({start: ref[index].sellEnd, end:ref[index + 1].sellStart})
                return obj2[key].push({ start: item.sellEnd, end:endDate})
        })
        })
        structuresBox.forEach(structure => {
            if(!obj2[structure.structureId]) {
                return obj2[structure.structureId] = [{
                    start: structure.duration.startDate >= startDate ?  structure.duration.startDate : startDate, 
                    end: structure.duration.endDate <= endDate ? structure.duration.endDate : endDate
                }]
            }
            if(endDate > structure.duration.endDate) {
                obj2[structure.structureId][obj2[structure.structureId].length - 1].end = structure.duration.endDate
            }   
        })
        
        const obj3:StructureDurations = {}
        Object.entries(obj2).forEach(([key,value]) => {
            value.forEach(duration => {
                if(duration.start < duration.end && duration.end <= endDate) {
                    obj3[key] ? obj3[key].push(duration) : obj3[key] = [duration]
                }
            })
        })
        return  obj3
    }

    const handlePathChange = (thisPath:string, thisIndex:number) => {
        const clone = [...paths]
        clone[thisIndex].isSelected = !clone[thisIndex].isSelected

        const oneIsSelected = clone.some(path => path.isSelected)
        if(!oneIsSelected)  return setFiltetred({...filtered, edited:JSON.parse(JSON.stringify({...filtered.initial}))})

        const clone2 = {} as StructureDurations
        Object.entries(filtered.initial).forEach(([key, value]) => {
            allStructures.forEach(item => {
                if(item.id === key) {
                    paths.forEach(path => {
                        if(path.isSelected && item.location.path.includes(path.name)) clone2[key] = value
                    })
                }
            })
        })
        setFiltetred({...filtered, edited:clone2})
        setPaths(clone)
    }
 
    const handleButtonClick = () => setFiltetred({
        initial:filterStructures(startDate, endDate),
        edited: filterStructures(startDate, endDate)
    })

    const captureContent = () => {
        const element = document.getElementById('content-to-capture')
      
        domtoimage.toPng(element!).then((dataUrl) => {
          const pdf = new jsPDF()
          const pdfWidth = pdf.internal.pageSize.getWidth()
          const pdfHeight = (element!.offsetHeight * pdfWidth) / element!.offsetWidth
      
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
          pdf.save('document.pdf')
        }).catch((error) => {
          console.error('An error occurred while generating the PDF:', error)
        })
      }

        const generatePDF = () => captureContent()

if(isLoading || !paths[0]) return <Loading />
console.log("startDate", startDate, "endDate", endDate)
return (
    <main className="min-h-screen w-full">
        <PageTitle name='گزارش سازه های خالی' />
        <SearchContainer />

        <div className="flex items-center justify-center gap-3 mb-10">
            <div className='flex items-center gap-3 w-1/3'>
                <label htmlFor="startDate" className='text-[#767676] font-bold'>
                    تاریخ شروع
                </label>

                <DatePicker
                    inputClass='formInput text-black bg-gray-200'
                    format='YYYY-MM-DD'
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(e : DateObject) => setStartDate(e.unix)}
                />
            </div>

            <div className='flex items-center gap-3 w-1/3'>
                <label htmlFor="endDate" className='text-[#767676] font-bold'>
                    تاریخ پایان
                </label>

                <DatePicker
                    inputClass='formInput text-black bg-gray-200'
                    format='YYYY-MM-DD'
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(e : DateObject) => setEndDate(e.unix)}
                />
            </div>

            <button 
                className='primaryButton w-1/5' 
                onClick={handleButtonClick}
            >
                اعمال فیلتر
            </button>

            <FaFilePdf 
                onClick={generatePDF}
                className='text-5xl text-red-600 dark:text-red-300 transition-all dark:hover:text-gray-300 hover:text-gray-500 cursor-pointer'
            />
        </div>
        
      <div className="max-w-full flex flex-wrap gap-2 my-3">
        {paths.map(({name, isSelected}, index) => (
          <label key={name} className="flex items-center gap-1 text-xs">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handlePathChange(name, index)}
            />
            <span>{name}</span>
          </label>
        ))}
      </div>
    
        <div  
            id="content-to-capture"
            style={{color: '#8a8a8a'}}
        >
            <div className='p-2 w-full border-[1px] border-black dark:border-gray-600 rounded-md my-2 grid grid-cols-12'>
                <p className='col-span-1'>
                    شماره
                </p>
                <p className='col-span-2'>
                    کد سامانه
                </p>
                <p className='col-span-2'>
                    مسیر
                </p>
                <p className='col-span-3'>
                    آدرس
                </p>
                <p className='col-span-2 text-left'>
                    شروع
                </p>
                <p className='col-span-2 text-left'>
                    پایان
                </p>
            </div>
            {endDate - startDate >= 0 ?
            Object.entries(filtered.edited).map(([key, val], index) => {
                const structureFound :any = allStructures.find(str => str.id === key)
                return val.map((availables) => {
                    console.log("HEY", availables.start)
                    return (
                    <div
                        key={`${key}${Math.random()}`}
                        className='p-2 w-full border-[1px] border-black dark:border-gray-600 rounded-md my-2 grid grid-cols-12'
                    >
                        <p className='col-span-1'>
                            {index + 1}
                        </p>
                        <p className='col-span-2'>
                            {structureFound?.name}
                        </p>
                        <p className='col-span-2'>
                            {structureFound?.location.path}
                        </p>
                        <p className='col-span-3'>
                            {structureFound?.location.address}
                        </p>
                        <p className='col-span-2 text-left'>
                            {
                            availables.start === startDate ?
                                moment.unix(availables.start).format('jYYYY-jM-jD')
                                :
                                moment.unix(new Date(availables.start).setDate(new Date(availables.start).getDate())).add(1, 'd').format('jYYYY-jM-jD')
                            }
                        </p>
                        <p className='col-span-2 text-left'>
                            {
                            availables.end === endDate ?
                                moment.unix(availables.end).format('jYYYY-jM-jD')
                                :
                                moment.unix(new Date(availables.end).setDate(new Date(availables.end).getDate())).add(1, 'd').format('jYYYY-jM-jD')
                            }
                        </p>
                    </div>
                )
                })
            })
            :
            <p className='bg-red-500 text-white'>
                تاریخ شروع باید قبل آغاز باشد.
            </p>
        }
        </div>
    </main>
    )
}

export default Availables