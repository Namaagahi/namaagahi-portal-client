"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const PageTitle = dynamic(
  () => import('@/app/components/main/PageTitle'),
  { ssr: false }
)
const NewBox = dynamic(
  () => import('@/app/features/boxes/NewBox'),
  { ssr: false }
)

const CreateBox = () => {

  const [boxMark, setBoxMark] = useState('')

  return (
    <>
      <main className="min-h-screen">
        <PageTitle name={'ایجاد باکس جدید'} />
        <div className='flex flex-col gap-9 justify-center'>
          <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
            <small className="pr-3 text-slate-500 inline-block font-bold">نوع باکس</small>
            <p className='font-bold text-lg'>نوع باکس را انتخاب کنید</p>
            <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 '>
              <button
                onClick={() => setBoxMark('owner')} 
                className={`${boxMark === 'owner' && 'bg-[#833841] text-white shadow-md'} btn-form-select`}
              >
                باکس owner
              </button>
              <button
                onClick={() => setBoxMark('buyShort')} 
                className={`${boxMark === 'buyShort' && 'bg-[#833841] text-white shadow-md'} btn-form-select`}
              >
                باکس buy کوتاه مدت
              </button>
              <button
                onClick={() => setBoxMark('buyLong')}
                className={`${boxMark === 'buyLong' && 'bg-[#833841] text-white shadow-md'} btn-form-select`}
              >
                باکس buy بلند مدت
              </button>
            </div>
          </div>
      {
        boxMark === 'owner' &&
            <NewBox 
              mark={boxMark}
            />
      }
      {
        boxMark === 'buyShort' &&
            <NewBox 
              mark={boxMark}
            />
      }
      {
        boxMark === 'buyLong' &&
            <NewBox 
              mark={boxMark}
            />
      }
        </div>
      </main>
    </>
  )
}

export default CreateBox