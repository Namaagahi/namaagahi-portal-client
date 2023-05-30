"use client"
import PageTitle from '@/app/components/main/PageTitle'
import NewBox from '@/app/features/boxes/NewBox'
import React, { useState } from 'react'

const CreateBox = () => {

  const [boxType, setBoxType] = useState('')

  return (
    <>
      <main className="min-h-screen">
        <PageTitle name={'ایجاد باکس جدید'} />
        <div className='flex flex-col gap-9 justify-center'>
          <div className='flex flex-col gap-8 items-start w-full p-8 bg-[#FFF1F1] rounded-[30px] text-black'>
            <p className='font-bold text-lg'>نوع باکس را انتخاب کنید</p>
            <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 '>
              <button
                onClick={() => setBoxType('owner')} 
                className={`${boxType === 'owner' && 'bg-[#833841] text-white shadow-md'} btn-form-select`}
              >
                باکس owner
              </button>
              <button
                onClick={() => setBoxType('buyShort')} 
                className={`${boxType === 'buyShort' && 'bg-[#833841] text-white shadow-md'} btn-form-select`}
              >
                باکس buy کوتاه مدت
              </button>
              <button
                onClick={() => setBoxType('buyLong')}
                className={`${boxType === 'buyLong' && 'bg-[#833841] text-white shadow-md'} btn-form-select`}
              >
                باکس buy بلند مدت
              </button>
            </div>
          </div>
      {
        boxType === 'owner' &&
            <NewBox 
              type={boxType}
            />
      }
      {
        boxType === 'buyShort' &&
            <NewBox 
              type={boxType}
            />
      }
      {
        boxType === 'buyLong' &&
            <NewBox 
              type={boxType}
            />
      }
        </div>
      </main>
    </>
  )
}

export default CreateBox