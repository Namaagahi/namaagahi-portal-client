'use client'
import { selectAllBoxes, useGetAllBoxesQuery } from '@/app/apiSlices/boxesApiSlice'
import { selectAllPlans, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import { selectAllStructures, useGetStructuresQuery } from '@/app/apiSlices/structuresApiSlice'
import { BoxObject, BoxStructure, PlanObject, StructureObject, StructurePlanObject } from '@/app/lib/interfaces'
import moment from 'jalali-moment'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

interface InitialStructureDurations {
    [key:string]: {
    sellStart: string
    sellEnd:string
    diff?:number
    }[]
}

interface StructureDurations {
    [key:string]: {
    start: string
    end:string
    }[]
}

const Test = () => {
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


    function convertToEnglishDate(dateStr: any) {
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let englishDate = "";
        [...dateStr].forEach(char => {
          let index = persianDigits.indexOf(char);
          englishDate += (index !== -1) ? englishDigits[index] : char
        })
        return englishDate
      }

    const allBoxes: BoxObject[] = useSelector(state => selectAllBoxes(state) as BoxObject[])
    const allPlans: PlanObject[] = useSelector(state => selectAllPlans(state) as PlanObject[])

    const customFunction = (startDate:string, endDate:string) => {
        const structuresBox: BoxStructure[] = []
        allBoxes.forEach(box => {
            box.structures.forEach(structure => {
                if(Number(convertToEnglishDate(structure.duration.endDate).replaceAll('-', '')) >= Number(startDate.replaceAll('-', ''))) structuresBox.push(structure)
            })
        })
        const structuresPlans:StructurePlanObject[] = []
        allPlans.forEach(plan => {
            plan.structures.forEach(structure => {
                if(Number(convertToEnglishDate(structure.structureRecord.duration.endDate).replaceAll('-', '')) >= Number(startDate.replaceAll('-', ''))) structuresPlans.push(structure)
            })
        })
        if(!structuresBox[0] && !structuresPlans[0]) return alert('lool')

        const obj:InitialStructureDurations = {}
        structuresPlans.forEach(structure => {
            if(obj[structure.structureId]) return obj[structure.structureId].push({...structure.duration})
            obj[structure.structureId] = [{...structure.duration}]
        })

        const obj2:StructureDurations = {}
        Object.entries(obj).forEach(([key, value]) => {
            value.forEach((item, index, ref) => {
                if(!obj2[key]) obj2[key] = [{start: startDate, end: item.sellStart}]
                if(ref[index + 1]) return obj2[key].push({start: ref[index].sellEnd, end:ref[index + 1].sellStart})
                return obj2[key].push({ start: item.sellEnd, end:endDate})
        })
        })
        structuresBox.forEach(structure => {
            if(!obj2[structure.structureId]) {
                return obj2[structure.structureId] = [{
                    start:Number(convertToEnglishDate(structure.duration.startDate).replaceAll('-', '')) >= Number(startDate.replaceAll('-', ''))? startDate : convertToEnglishDate(structure.duration.startDate), 
                    end: Number(convertToEnglishDate(structure.duration.endDate).replaceAll('-', '')) <= Number(endDate.replaceAll('-', '')) ? convertToEnglishDate(structure.duration.endDate) : endDate
                }]
            }
            if(Number(endDate.replaceAll('-', '')) >  Number(convertToEnglishDate(structure.duration.endDate).replaceAll('-', ''))) {
            obj2[structure.structureId][obj2[structure.structureId].length - 1].end = convertToEnglishDate(structure.duration.endDate)
            }
        })
        
        const obj3:StructureDurations = {}
        Object.entries(obj2).forEach(([key,value]) => {
            value.forEach(duration => {
                if(Number(duration.start.replaceAll('-', '')) < Number(duration.end.replaceAll('-', ''))) {
                    obj3[key] ? obj3[key].push(duration) : obj3[key] = [duration]
                }
            })
        })
        return obj3
    }
    
    useEffect(() => {
     console.log(customFunction('1405-05-15', '1410-10-31'))
    }, [])

return (
    <div>Test</div>
    )
}

export default Test