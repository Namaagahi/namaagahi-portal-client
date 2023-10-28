'use client'
import { StructureObject, PlanObject } from '@/app/lib/interfaces'
import {  selectAllStructures ,useGetStructuresQuery } from '@/app/apiSlices/structuresApiSlice'
import { selectAllPlans, useGetAllPlansQuery } from '@/app/apiSlices/plansApiSlice'
import usePageTitle from '@/app/hooks/usePageTitle'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import PageTitle from '@/app/components/main/PageTitle'
import SearchContainer from '@/app/components/main/SearchContainer'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import moment from 'jalali-moment'
import Badge from '@/app/components/main/Badge'

type Range = {
  startDate: number
  endDate: number
}

const Availables = () => {
  usePageTitle('سازه های خالی')
  const [startDate, setStartDate] = useState<number>(new Date().getTime() / 1000)
  const [endDate, setEndDate] = useState<number>(new Date().getTime() / 1000)
  const [availableStructures, setAvailableStructures] = useState<Map<any, any>>(new Map())

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

  const allPlans: PlanObject[] = useSelector(state => selectAllPlans(state) as PlanObject[])
  const allStructures: StructureObject[] = useSelector(state => selectAllStructures(state) as StructureObject[])

  const calculateAvailableDatesWithNames = (structures: StructureObject[], plans: PlanObject[], startDate: number, endDate: number) => {
    const availableDatesWithNames = new Map()

    for (const plan of plans) {
      for (const planStructure of plan.structures) {
        if (
          planStructure.duration.sellStart <= endDate &&
          planStructure.duration.sellEnd >= startDate &&
          plan.status === 'done'
        ) {
          const structureId = planStructure.structureId

          const structure = structures.find((structure) => structure._id === structureId)

          if (structure) {
            const structureName = structure.name

            if (!availableDatesWithNames.has(structureName))
              availableDatesWithNames.set(structureName, [])

            const availableRanges = availableDatesWithNames.get(structureName)

            if (availableRanges.length === 0)
              availableRanges.push({ startDate, endDate })

            availableRanges.sort((a: Range, b: Range) => a.startDate - b.startDate)

            for (const availableRange of availableRanges) {
              if (
                planStructure.duration.sellStart <= availableRange.endDate &&
                planStructure.duration.sellEnd >= availableRange.startDate
              ) {
                if (planStructure.duration.sellStart > availableRange.startDate) {
                  availableRanges.push({
                    startDate: availableRange.startDate,
                    endDate: planStructure.duration.sellStart,
                  })
                }

                if (planStructure.duration.sellEnd < availableRange.endDate) {
                  availableRanges.push({
                    startDate: planStructure.duration.sellEnd,
                    endDate: availableRange.endDate,
                  })
                }

                availableRanges.splice(availableRanges.indexOf(availableRange), 1)
              }
            }
          }
        }
      }
    }

    return availableDatesWithNames
  }

  const handleFilterClick = () => setAvailableStructures(calculateAvailableDatesWithNames(allStructures, allPlans, startDate, endDate))

  return (
      <div>
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
                  onClick={handleFilterClick}
              >
                  اعمال فیلتر
              </button>
          </div>
          <ul className='flex flex-col mx-auto gap-4'>
            {Array.from(availableStructures.entries()).map(([key, value]) => (
              <li key={key} className='flex flex-col justify-center w-[50%] mx-auto text-lg bg-gray-400 dark:bg-white dark:bg-opacity-25 bg-opacity-25 rounded-md p-2 gap-2 hover:scale-110 transition-all cursor-pointer'>
                <p className='text-xl font-bold'>{key}</p>
                {value.map((dateRange: Range, index: number, ref: any) => (
                  <div className=' flex justify-between gap-4 p-2'>
                    <Badge index={index} />
                  {index === 0?
                  <>
                    <p>از</p>
                    <p>{moment.unix(dateRange.startDate).format('jYYYY-jMM-jDD')}</p>
                    <p>تا</p>
                    <p>{moment.unix(dateRange.endDate).subtract(1, 'd').format('jYYYY-jMM-jDD')}</p>
                  </>
                  :
                  <>
                    <p>از</p>
                  <p>{moment.unix(dateRange.startDate).add(1, 'd').format('jYYYY-jMM-jDD')}</p>
                  <p>تا</p>
                    {index !== ref.length -1 ?
                      <p>{moment.unix(dateRange.endDate).subtract(1, 'd').format('jYYYY-jMM-jDD')}</p>
                      :
                      <p>{moment.unix(dateRange.endDate).format('jYYYY-jMM-jDD')}</p>}

                  </>
                  }
                  </div>
                ))}
              </li>
            ))}
          </ul>
      </div>
      )
}

export default Availables
