'use client'
import { selectAllBoxes, useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import { selectAllPlans, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import {  selectAllStructures ,useGetStructuresQuery } from '@/app/apiSlices/structuresApiSlice'
import { StructureObject, BoxObject, BoxStructure, PlanObject, StructurePlanObject } from '@/app/lib/interfaces'
import moment from 'jalali-moment'
import React, { useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import { useSelector } from 'react-redux'
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"
import Loading from '@/app/features/loading/Loading'
import domtoimage from 'dom-to-image';
import {jsPDF} from 'jspdf'
import { FaFilePdf } from 'react-icons/fa'
import PageTitle from '@/app/components/main/PageTitle'

interface InitialStructureDurations {
    [key:string]: {
    sellStart: number
    sellEnd:number
    diff?:number
    }[]
}

interface StructureDurations {
    [key:string]: {
    start: number
    end:number
    }[]
}


const Availables = () => {
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

    const [startDate, setStartDate] = useState(new Date().getTime())
    const [endDate, setEndDate] = useState(new Date().getTime())
    const [filtered, setFiltetred] = useState<StructureDurations | {}>({})
    const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
    const uniquePaths = Array.from(new Set(allStructures.map(structure => structure.location.path)))

    const filterStructures = (startDate:number, endDate:number) => {

        const structuresBox: BoxStructure[] = []
        allBoxes.forEach(box => {
            box.structures.forEach(structure => {
                if(structure.duration.endDate >= startDate) structuresBox.push(structure)
            })
        })
        const structuresPlans:StructurePlanObject[] = []
        allPlans.forEach(plan => {
            plan.structures.forEach(structure => {
                if(structure.structureRecord.duration.endDate >= startDate) structuresPlans.push(structure)
            })
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
                console.log("IF 1")
                return obj2[structure.structureId] = [{
                    start: structure.duration.startDate >= startDate ? startDate : structure.duration.startDate, 
                    end: structure.duration.endDate <= endDate ? structure.duration.endDate : endDate
                }]
            }
            if(endDate > structure.duration.endDate) {
                console.log("IF 2")
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

    const handlePathChange = (path: string) => {
        const updatedSelectedPaths = selectedPaths.includes(path)
          ? selectedPaths.filter(selectedPath => selectedPath !== path)
          : [...selectedPaths, path]
        setSelectedPaths(updatedSelectedPaths)
      }

    const handleButtonClick = () => setFiltetred(filterStructures(startDate, endDate))

    const captureContent = () => {
        const element = document.getElementById('content-to-capture')
      
        domtoimage.toPng(element!).then((dataUrl) => {
          const pdf = new jsPDF();
          const pdfWidth = pdf.internal.pageSize.getWidth()
          const pdfHeight = (element!.offsetHeight * pdfWidth) / element!.offsetWidth;
      
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
          pdf.save('document.pdf')
        }).catch((error) => {
          console.error('An error occurred while generating the PDF:', error)
        });
      };

        const generatePDF = () => captureContent()


    console.log("FILTERED", filtered)
    console.log("selectedPaths", selectedPaths)

if(isLoading) return <Loading />
return (
    
    <main className="min-h-screen w-full">
        <PageTitle name='گزارش سازه های خالی' />
        <div className="flex items-center justify-center gap-3 mb-10">
            <div className='flex items-center gap-3 w-1/3'>
                <label htmlFor="startDate" className='text-[#767676] font-bold'>تاریخ شروع</label>
                <DatePicker
                    inputClass='input-primary'
                    format='YYYY-MM-DD'
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(e : DateObject) => setStartDate(e.unix * 1000)}
                />
            </div>
            <div className='flex items-center gap-3 w-1/3'>
                <label htmlFor="endDate" className='text-[#767676] font-bold'>تاریخ پایان</label>
                <DatePicker
                    inputClass='input-primary'
                    format='YYYY-MM-DD'
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(e : DateObject) => setEndDate(e.unix * 1000)}
                />
            </div>
            <button className='btn-primary w-1/5' onClick={handleButtonClick}>اعمال فیلتر</button>
                <FaFilePdf 
                    onClick={generatePDF}
                    className='text-5xl text-red-600 dark:text-red-300 transition-all dark:hover:text-gray-300 hover:text-gray-500 cursor-pointer'
                />
        </div>
        
      <div className="max-w-full flex flex-wrap gap-2 my-3">
        {uniquePaths.map(path => (
          <label key={path} className="flex items-center gap-1 text-xs">
            <input
              type="checkbox"
              checked={selectedPaths.includes(path)}
              onChange={() => handlePathChange(path)}
            />
            <span>{path}</span>
          </label>
        ))}
      </div>
    
        <div  
            id="content-to-capture"
            style={{color: '#8a8a8a'}}
        >
            <div className='p-2 w-full border-[1px] border-black dark:border-gray-600 rounded-lg my-2 grid grid-cols-12'>
                <p className='col-span-1'>شماره</p>
                <p className='col-span-2'>کد سامانه</p>
                <p className='col-span-2'>مسیر</p>
                <p className='col-span-3'>آدرس</p>
                <p className='col-span-2 text-left'>شروع</p>
                <p className='col-span-2 text-left'>پایان</p>
            </div>
            {endDate - startDate >= 0 ?
            Object.entries(filtered).map(([key, val], index) => {
                const structureFound :any = allStructures.find(str => str.id === key)
                return val.map((availables) => {
                    // console.log(availables.start === startDate )
                return (
                    <div
                        key={`${key}${Math.random()}`}
                        className='p-2 w-full border-[1px] border-black dark:border-gray-600 rounded-lg my-2 grid grid-cols-12'
                    >
                        <p className='col-span-1'>{index + 1}</p>
                        <p className='col-span-2'>{structureFound?.name}</p>
                        <p className='col-span-2'>{structureFound?.location.path}</p>
                        <p className='col-span-3'>{structureFound?.location.address}</p>
                        <p className='col-span-2 text-left'>
                            {
                            availables.start === startDate ?
                                moment(new Date(availables.start)).format('jYYYY-jM-jD')
                                :
                                moment(new Date(availables.start).setDate(new Date(availables.start).getDate() + 1)).format('jYYYY-jM-jD')
                            }
                        </p>
                        <p className='col-span-2 text-left'>
                            {
                            availables.end === endDate ?
                                moment(new Date(availables.end)).format('jYYYY-jM-jD')
                                :
                                moment(new Date(availables.end).setDate(new Date(availables.end).getDate() - 1)).format('jYYYY-jM-jD')
                            }
                        </p>
                    </div>
                )
                })
            })
            :
            <p className='bg-red-500 text-white'>تاریخ شروع باید قبل آغاز باشد.</p>
        }
        </div>
    </main>
    )
}

export default Availables