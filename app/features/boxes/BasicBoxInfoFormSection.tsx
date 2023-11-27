import { AddBoxForm, BoxObject, EditBoxForm, FinalCustomerObject, ProjectCodeObject } from '@/app/lib/interfaces'
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian_fa from "react-date-object/locales/persian_fa"
import CustomInput from '@/app/components/inputs/CustomInput'
import persian from "react-date-object/calendars/persian"
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import moment from 'jalali-moment'
import { useEffect, useState } from 'react'
import ChooseProjectCodeModal from '@/app/components/modals/ChooseProjectCodeModal'
import { useSelector } from 'react-redux'
import { selectAllProjectCodes, useGetAllProjectCodesQuery } from '@/app/apiSlices/projectCodeApiSlice'
import { selectAllFinalCustomers, useGetAllFinalCustomersQuery } from '@/app/apiSlices/finalCustomerApiSlice'
import Loading from '../loading/Loading'

type Props  = {
    page: string
    control: Control<AddBoxForm, any> | Control<EditBoxForm, any>
    box?: BoxObject
    handleStartDate: (value: DateObject | DateObject[] | null) => void
    handleEndDate: (value: DateObject | DateObject[] | null) => void
    errors: FieldErrors<AddBoxForm> | FieldErrors<EditBoxForm>
    mark: string
    setValue: UseFormSetValue<AddBoxForm>
  }

const BasicBoxInfoFormSection = (props: Props) => {

  const {
    page,
    control,
    box,
    errors,
    mark,
    handleStartDate,
    handleEndDate,
    setValue
  } = props


  useGetAllFinalCustomersQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false
  })

  const {
    isLoading: projectCodesLoading,
  } = useGetAllProjectCodesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  })

  const [isProjectCodeModal, setIsProjectCodeModal] = useState<boolean>(false)
  const [projectCodeId, setProjectCodeId] = useState<string | null>(null)

  const allProjectCodes: ProjectCodeObject[] = useSelector(state => selectAllProjectCodes(state) as ProjectCodeObject[])
  const allFinalCustomers: FinalCustomerObject[] = useSelector(state => selectAllFinalCustomers(state) as FinalCustomerObject[])

  const handleChooseProjectCodeModal = () => setIsProjectCodeModal(!isProjectCodeModal)
  const handleProjectCodeId = (projectCode: ProjectCodeObject | string) => {
    if (typeof projectCode === 'object') {
      setProjectCodeId(projectCode._id)
    } else {
      setProjectCodeId(null)
    }
  }

  const projectCode = allProjectCodes.find((projectCode) => projectCode._id === projectCodeId)

  useEffect(() => {
    if(projectCodeId) {
      setValue('projectNumber', projectCode!!.code)
    }
}, [projectCode])

  if(projectCodesLoading) return <Loading />
  console.log("projectCodeId", projectCodeId)
  return (
    <div className='formContainer'>
      <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات پایه</small>
      <div className="w-full grid grid-cols-4 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8">

      {
        isProjectCodeModal &&
          <ChooseProjectCodeModal
            handleModal={handleChooseProjectCodeModal}
            data={allProjectCodes}
            allFinalCustomers={allFinalCustomers}
            handleProjectCodeId={handleProjectCodeId}
          />
      }

      {
        mark === 'buyShort' &&
        <>
          <p
            className='dark:text-gray-200 hover:font-bold hover:dark:text-buttonHover transition-all cursor-pointer border-2 flex justify-center items-center'
            onClick={handleChooseProjectCodeModal}
          >
            {`${projectCodeId? `${projectCode?.code}` : "تخصیص کد پروژه"}`}
          </p>
          <CustomInput
            control={control}
            label='نام'
            name={'name'}
            type='text'
            errors={errors.name?.message}
            required={true}
            message={'نام را وارد کنید'}
            pattern={/^[P][R][0-9]{4}$/}
            className='formInput'
          />
          <CustomInput
            control={control}
            label='برند'
            name={'brand'}
            type='text'
            errors={errors.brand?.message}
            required={true}
            message={'نام برند را وارد کنید'}
            className='formInput'
          />
        </>
      }
        <div className="flex items-center gap-4 lg:gap-8">
          <div className='flex flex-col gap-3 '>
            <label
              htmlFor="startDate"
              className='formInputLabel'
            >
              تاریخ شروع
            </label>
            <DatePicker
              inputClass='formInput'
              format='YYYY-MM-DD'
              value={page === 'edit' ? moment.unix(box!.duration.startDate).format('jYYYY-jM-jD') : undefined}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              onChange={(e) => handleStartDate(e)}
            />
            <small className="text-xs text-rose-600 ">
              {errors.startDate?.message}
            </small>
          </div>
        <div className='flex flex-col gap-3 col-span-4'>
          <label
            htmlFor="endDate"
            className='formInputLabel'
          >
            تاریخ پایان
          </label>
          <DatePicker
            inputClass='formInput'
            format='YYYY-MM-DD'
            value={page === 'edit' ? moment.unix(box!.duration.endDate).format('jYYYY-jM-jD') : undefined}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            onChange={(e) => handleEndDate(e)}
          />

          <small className="text-xs text-rose-600 ">
            {errors.endDate?.message}
          </small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicBoxInfoFormSection
