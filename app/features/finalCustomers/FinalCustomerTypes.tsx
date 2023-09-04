import React from 'react'

const FinalCustomerTypes = (props: any) => {

    const {
        contractType,
        setContractType,
        customerType,
        setCustomerType
    } = props

  return (
    <div className='flex items-center gap-5 w-1/3 justify-between'>
    <div className='flex items-center gap-3'>
        <div className='flex items-center gap-1'>
            <input
                type="radio"
                id="official"
                name="contractType"
                value="official"
                checked={contractType === 'official'}
                onChange={() => setContractType('official')}
            />
            <label htmlFor="official">
                رسمی
            </label>
        </div>
        <div className='flex items-center gap-1'>
            <input
                type="radio"
                id="unofficial"
                name="contractType"
                value="unofficial"
                checked={contractType === 'unofficial'}
                onChange={() => setContractType('unofficial')}
            />
            <label htmlFor="unofficial">
                غیر رسمی
            </label>
        </div>
    </div>
    <div className='flex items-center gap-3'>
        <div className='flex items-center gap-1'>
            <input
                type="radio"
                id="legal"
                name="customerType"
                value="legal"
                checked={customerType === 'legal'}
                onChange={() => setCustomerType('legal')}
            />
            <label htmlFor="legal">
                حقوقی
            </label>
        </div>
        <div className='flex items-center gap-1'>
            <input
                type="radio"
                id="personal"
                name="customerType"
                value="personal"
                checked={customerType === 'personal'}
                onChange={() => setCustomerType('personal')}
            />
            <label htmlFor="personal">
                حقیقی
            </label>
        </div>
    </div>
</div>
  )
}

export default FinalCustomerTypes