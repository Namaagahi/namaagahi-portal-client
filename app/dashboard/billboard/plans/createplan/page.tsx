"use client"
import SearchContainer from '@/app/components/main/SearchContainer'
import ScrollContainer from '@/app/components/main/ScrollContainer'
import PageTitle from '@/app/components/main/PageTitle'
import React, { useState } from 'react'
import usePageTitle from '@/app/hooks/usePageTitle'
import NewPlan from '@/app/features/plans/NewPlan'

const CreatePlan = () => {
  usePageTitle('ایجاد پلن جدید')

  const [planMark, setPlanMark] = useState<string>('')

  return (
      <main className="min-h-screen">
        <PageTitle name={'ایجاد پلن جدید'} />
        <SearchContainer />
        <div className='flex flex-col gap-9 justify-center'>
          <div className='formContainer'>
            <small className="pr-3 text-slate-500 inline-block font-bold">
              نوع پلن
            </small>

            <p className='font-bold text-lg dark:text-gray-200'>
              نوع پلن را انتخاب کنید
            </p>

            <div className='w-full grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-12 items-center'>
              <button
                type='button'
                onClick={() => setPlanMark('regular')} 
                className={`${planMark === 'regular' && 'bg-primary text-white shadow-md'} formChooseButton w-full`}
              >
                 عادی
              </button>

              <button
                type='button'
                onClick={() => setPlanMark('package')} 
                className={`${planMark === 'package' && 'bg-primary text-white shadow-md'} formChooseButton w-full`}
              >
                پکیجی
              </button>

            </div>
          </div>
          {
            planMark &&
              <NewPlan mark={planMark}/>
          }
        </div>
        <ScrollContainer />
      </main>

  )
}

export default CreatePlan