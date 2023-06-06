"use client"
import PageTitle from '@/app/components/main/PageTitle'
import { useAddNewStructureMutation } from '@/app/features/structures/structuresApiSlice'
import useAuth from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const CreateStructure = () => {

  const { id } = useAuth()  

  const [addNewStructure, { 
    isLoading,
    isSuccess,
    isError,
    error
}] = useAddNewStructureMutation()

const { push } = useRouter()

const createStructureForm = useForm({
  defaultValues: {
    sysCode: Number,
    kind: '',
    district: '',
    path: '',
    address: '',
    style: '',
    face: '',
    dimensions: '',
    printSize: Number,
    docSize: Number,
    isAvailable: true,
  },
  mode: 'onSubmit'
})

const { register, handleSubmit, formState: {errors} } = createStructureForm

const onSubmit = async(data: any) => {
  if(isError) 'status' in error! && error.status === 409 && toast.error('این کد سامانه قبلا ثبت شده است')
  
  await addNewStructure({
    sysCode: data.sysCode, 
    kind: data.kind,
    district: data.district,
    path: data.path,
    address: data.address,
    style: data.style,
    face: data.face,
    dimensions: data.dimensions,
    printSize: data.printSize,
    docSize: data.docSize,
    isAvailable: data.isAvailable,
    user: id
  })

  if(isSuccess) {
    toast.success('سازه جدید با موفقیت ساخته شد')
    push('/dashboard/billboard/structures')
  }
}

  return ( 
    <main className="min-h-screen">
      <PageTitle name={'ایجاد سازه جدید'} />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-9 justify-center'
      >
        <div className='flex flex-col gap-8 items-start w-full p-8 bg-[#FFF1F1] rounded-[30px] text-black'>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">

            <div className='flex flex-col gap-3 col-span-6 lg:col-span-1'>
              <label htmlFor="sysCode" className='text-[#767676] font-bold'>کد سامانه</label>
              <input
                {...register("sysCode", {
                  required: {
                      value: true,
                      message:  'کد سامانه را وارد کنید'
                    }
                  })
                }
                  type="number"
                  id='sysCode'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
              />
            <small className="text-xs text-rose-600 ">{errors.sysCode && errors.sysCode?.message}</small>
            </div>

            <div className='flex flex-col gap-3 col-span-6 lg:col-span-2'>
              <label htmlFor="kind" className='text-[#767676] font-bold'>نوع سازه</label>
              <input
                {...register("kind", {
                  required: {
                      value: true,
                      message:  'نوع سازه را وارد کنید'
                    }
                  })
                }
                  type="string"
                  id='kind'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
              />
            <small className="text-xs text-rose-600 ">{errors.kind && errors.kind?.message}</small>
            </div>      

            <div className='flex flex-col gap-3 col-span-6 lg:col-span-1'>
              <label htmlFor="district" className='text-[#767676] font-bold'>منطقه</label>
              <input
                {...register("district", {
                  required: {
                      value: true,
                      message:  'منطقه را وارد کنید'
                    }
                  })
                }
                  type="string"
                  id='district'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
              />
            <small className="text-xs text-rose-600 ">{errors.district && errors.district?.message}</small>
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
                  type="string"
                  id='path'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
              />
            <small className="text-xs text-rose-600 ">{errors.path && errors.path?.message}</small>
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
                  type="string"
                  id='address'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
              />
            <small className="text-xs text-rose-600 ">{errors.address && errors.address?.message}</small>
            </div>

            <div className='flex flex-col gap-3 col-span-6 lg:col-span-1'>
              <label htmlFor="style" className='text-[#767676] font-bold'>تیپ</label>
              <input
                {...register("style", {
                  required: {
                      value: true,
                      message:  'تیپ را وارد کنید'
                    }
                  })
                }
                  type="string"
                  id='style'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
              />
            <small className="text-xs text-rose-600 ">{errors.style && errors.style?.message}</small>
            </div>

            <div className='flex flex-col gap-3 col-span-6 lg:col-span-1'>
              <label htmlFor="face" className='text-[#767676] font-bold'>وجه</label>
              <input
                {...register("face", {
                  required: {
                      value: true,
                      message:  'وجه را وارد کنید'
                    }
                  })
                }
                  type="string"
                  id='face'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
              />
            <small className="text-xs text-rose-600 ">{errors.face && errors.face?.message}</small>
            </div>

            <div className='flex flex-col gap-3 col-span-6  lg:col-span-2'>
              <label htmlFor="dimensions" className='text-[#767676] font-bold'>ابعاد</label>
              <input
                {...register("dimensions", {
                  required: {
                      value: true,
                      message:  'ابعاد را وارد کنید'
                    }
                  })
                }
                  type="string"
                  id='dimensions'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
              />
            <small className="text-xs text-rose-600 ">{errors.dimensions && errors.dimensions?.message}</small>
            </div>

            <div className='flex flex-col gap-3 col-span-6 lg:col-span-1'>
              <label htmlFor="printSize" className='text-[#767676] font-bold'>متراژ چاپ</label>
              <input
                {...register("printSize", {
                  required: {
                      value: true,
                      message:  'متراژ چاپ را وارد کنید'
                    }
                  })
                }
                  type="number"
                  id='printSize'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
              />
            <small className="text-xs text-rose-600 ">{errors.printSize && errors.printSize?.message}</small>
            </div>

            <div className='flex flex-col gap-3 col-span-6 lg:col-span-1'>
              <label htmlFor="docSize" className='text-[#767676] font-bold'>متراژ واقعی</label>
              <input
                {...register("docSize", {
                  required: {
                      value: true,
                      message:  'متراژ واقعی را وارد کنید'
                    }
                  })
                }
                  type="number"
                  id='docSize'
                  className='px-6 py-5 rounded-[50px] bg-white outline-none'
              />
            <small className="text-xs text-rose-600 ">{errors.docSize && errors.docSize?.message}</small>
            </div>

          </div>
        <button className="btn-primary ">افزودن سازه</button>
        </div>
      </form>
    </main>
  )
}

export default CreateStructure