import React from 'react'

const NewBox = ({type}: {type: string}) => {
    console.log(type)
  return (
    <form
        className='w-full flex flex-col gap-9 justify-center'
        // onSubmit={onSaveNoteClick}
    >
        <div className='flex flex-col gap-8 items-start w-full p-8 bg-[#FFF1F1] rounded-[30px] text-black'>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                <div className='flex flex-col gap-3'>
                    <label htmlFor="boxName" className='text-[#767676] font-bold'>نام باکس</label>
                    <input
                        type="text"
                        id='boxName'
                        className='px-6 py-5 rounded-[50px] bg-white outline-none'
                    />
                </div>
            {
                type === 'buyShort' &&
                <>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="projectNumber" className='text-[#767676] font-bold'>کد پروژه</label>
                        <input
                            type="number"
                            id='projectNumber'
                            className='px-6 py-5 rounded-[50px] bg-white outline-none'
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="brand" className='text-[#767676] font-bold'>برند</label>
                        <input
                            type="text"
                            id='brand'
                            className='px-6 py-5 rounded-[50px] bg-white outline-none'
                        />
                    </div>
                </>
            }
                <div className='flex flex-col gap-3'>
                    <label htmlFor="startDate" className='text-[#767676] font-bold'>تاریخ شروع</label>
                    <input
                        type="date"
                        id='startDate'
                        className='px-6 py-5 rounded-[50px] bg-white outline-none'
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="endDate" className='text-[#767676] font-bold'>تاریخ پایان</label>
                    <input
                        type="date"
                        id='endDate'
                        className='px-6 py-5 rounded-[50px] bg-white outline-none'
                    />
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-8 items-start w-full p-8 bg-[#FFF1F1] rounded-[30px] text-black'>آثغ
        </div>
    </form>
  )
}

export default NewBox