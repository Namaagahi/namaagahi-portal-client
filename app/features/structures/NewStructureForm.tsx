"use client"
import { useAddNewStructureMutation } from '@/app/features/structures/structuresApiSlice'
import { StructureObjectForm } from '@/app/lib/interfaces'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import useAuth from '@/app/hooks/useAuth'
import { toast } from 'react-toastify'

const NewStructureForm = () => {

    const { id } = useAuth()  

    const [addNewStructure, { 
      isSuccess,
      isError,
      error
  }] = useAddNewStructureMutation()
  
  const { push } = useRouter()
  
  const createStructureForm = useForm<StructureObjectForm>({
    defaultValues: {
      name: '',
      district: NaN,
      path: '',
      address: '',
      isAvailable: true,
    },
    mode: 'onSubmit'
  })
  
  const { register, handleSubmit, formState: {errors} } = createStructureForm
  
  const onSubmit = async(data: any) => {
    if(isError) {
      'status' in error! && error.status === 409 && toast.error('این کد سامانه قبلا ثبت شده است')
      'status' in error! && error.status === 400 && toast.error('همه فیلدها را تکمیل کنید')
      console.log(error)
    }
    
    await addNewStructure({
      userId: id,
      name: data.name,
      location: {
        district: data.district,
        path: data.path,
        address: data.address
      }
    })
  
  }
  
  if(isSuccess) {
    toast.success('سازه جدید با موفقیت ساخته شد')
    push('/dashboard/billboard/structures')
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-9 justify-center'
    >
      <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">

          <div className='flex flex-col gap-3 col-span-6 lg:col-span-1'>
            <label htmlFor="name" className='text-[#767676] font-bold'>کد سامانه</label>
            <input
              {...register("name", {
                required: {
                    value: true,
                    message:  'کد سامانه را وارد کنید' 
                  },
                  pattern: {
                      value: /^N\d{4}(-\d)?$/,
                      message: 'فرمت کد پروژه باید به صورت N و چهار عدد بعد از آن باشد'
                  }
                })
              }
                autoComplete='off'
                type="text"
                id='name'
                className='input-create-page'
            />
          <small className="error-page-forms ">{errors.name && errors.name?.message}</small>
          </div>   

          <div className='flex flex-col gap-3 col-span-6 lg:col-span-1'>
            <label htmlFor="district" className='text-[#767676] font-bold'>منطقه</label>
            <input
              {...register("district", {
                required: {
                    value: false,
                    message:  'منطقه را وارد کنید'
                  }
                })
              }
                type="number"
                id='district'
                className='input-create-page'
            />
          <small className="error-page-forms ">{errors.district && errors.district?.message}</small>
          </div>

          <div className='flex flex-col gap-3 col-span-6  lg:col-span-2'>
            <label htmlFor="path" className='text-[#767676] font-bold'>مسیر</label>
            <input
              {...register("path", {
                required: {
                    value: true,
                    message:  'مسیر را وارد کنید'
                  }
                })
              }
                type="text"
                id='path'
                className='input-create-page'
            />
          <small className="error-page-forms ">{errors.path && errors.path?.message}</small>
          </div>

          <div className='flex flex-col gap-3 col-span-6 lg:col-span-4'>
            <label htmlFor="address" className='text-[#767676] font-bold'>نشانی</label>
            <input
              {...register("address", {
                required: {
                    value: true,
                    message:  'نشانی را وارد کنید'
                  }
                })
              }
                type="text"
                id='address'
                className='input-create-page'
            />
          <small className="error-page-forms ">{errors.address && errors.address?.message}</small>
          </div>

        </div>
      <button className="btn-primary ">افزودن سازه</button>
      </div>
    </form>
  )
}

export default NewStructureForm