import { useAddNewStructureMutation } from '@/app/features/structures/structuresApiSlice'
import useAuth from '@/app/hooks/useAuth'
import { StructureObject } from '@/app/lib/interfaces'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const NewStructureForm = () => {

    const { id } = useAuth()  

    const [addNewStructure, { 
      isSuccess,
      isError,
      error
  }] = useAddNewStructureMutation()
  
  const { push } = useRouter()
  
  const createStructureForm = useForm<StructureObject>({
    defaultValues: {
      sysCode: '',
      kind: '',
      district: NaN,
      path: '',
      address: '',
      style: '',
      face: '',
      dimensions: '',
      printSize: NaN,
      docSize: NaN,
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
    // console.log(data)
  }

  const structureKinds = ['بیلبورد', 'عرشه پل عابر پیاده', 'عرشه پل سواره رو']

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-9 justify-center'
    >
      <div className='flex flex-col gap-8 items-start w-full p-8 bg-bgform rounded-[30px] text-black'>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">

          <div className='flex flex-col gap-3 col-span-6 lg:col-span-1'>
            <label htmlFor="sysCode" className='text-[#767676] font-bold'>کد سامانه</label>
            <input
              {...register("sysCode", {
                required: {
                    value: true,
                    message:  'کد سامانه را وارد کنید' 
                  },
                  pattern: {
                      value: /^[N][0-9]{4}$/,
                      message: 'فرمت کد پروژه باید به صورت N و چهار عدد بعد از آن باشد'
                  }
                })
              }
                type="text"
                id='sysCode'
                className='input-create-page'
            />
          <small className="error-page-forms ">{errors.sysCode && errors.sysCode?.message}</small>
          </div>

          <div className='flex flex-col gap-3 col-span-6 lg:col-span-2'>
            <label htmlFor="kind" className='text-[#767676] font-bold'>نوع سازه</label>
            <select
             id="kind"
             className='px-6 py-3 rounded-[50px] bg-white outline-none'
             {...register("kind", {
              required: {
                  value: true,
                  message:  'نوع سازه را انتخاب کنید'
                }
              })
            }
            >
              {structureKinds.map((kind: string, index: number) => {
                return (
                  <option key={index} value={kind}>{kind}</option>
                )
              })}
            </select>
            {/* <input
              {...register("kind", {
                required: {
                    value: true,
                    message:  'نوع سازه را انتخاب کنید'
                  }
                })
              }
                type="text"
                id='kind'
                className='input-create-page'
            /> */}
          <small className="error-page-forms ">{errors.kind && errors.kind?.message}</small>
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
                type="text"
                id='style'
                className='input-create-page'
            />
          <small className="error-page-forms ">{errors.style && errors.style?.message}</small>
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
                type="text"
                id='face'
                className='input-create-page'
            />
          <small className="error-page-forms ">{errors.face && errors.face?.message}</small>
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
                type="text"
                id='dimensions'
                className='input-create-page'
            />
          <small className="error-page-forms ">{errors.dimensions && errors.dimensions?.message}</small>
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
                className='input-create-page'
            />
          <small className="error-page-forms ">{errors.printSize && errors.printSize?.message}</small>
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
                className='input-create-page'
            />
          <small className="error-page-forms ">{errors.docSize && errors.docSize?.message}</small>
          </div>

        </div>
      <button className="btn-primary ">افزودن سازه</button>
      </div>
    </form>
  )
}

export default NewStructureForm