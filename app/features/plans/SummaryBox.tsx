import React, { useEffect } from 'react'
import Loading from '../loading/Loading'

const SummaryBox = (props: any) => {

    const { structure, selectedStructure, setValue, fieldIndex } = props

    useEffect(() => {
        setValue(`structures.${fieldIndex}.structureRecord`, selectedStructure)
    }, [])

    if(!structure) return <Loading />
  return (
    <>
        <div className='flex gap-3'>
            <label htmlFor="typeName" className='text-[#767676] font-bold'>مسیر</label>
            <p>{structure?.location?.path}</p>
        </div>
        <div className='flex gap-3'>
            <label htmlFor="typeName" className='text-[#767676] font-bold'>نشانی</label>
            <p>{structure?.location?.address}</p>
        </div>
        <div className='flex gap-3'>
            <label htmlFor="typeName" className='text-[#767676] font-bold'>مساحت</label>
            <p>{structure?.marks?.markOptions?.printSize}</p>
        </div>
    </>
  )
}

export default SummaryBox