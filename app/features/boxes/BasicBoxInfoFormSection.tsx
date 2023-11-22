import { AddBoxForm, BoxObject, EditBoxForm } from '@/app/lib/interfaces'
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian_fa from "react-date-object/locales/persian_fa"
import CustomInput from '@/app/components/inputs/CustomInput'
import persian from "react-date-object/calendars/persian"
import { Control, FieldErrors } from 'react-hook-form'
import moment from 'jalali-moment'

type Props  = {
    page: string
    control: Control<AddBoxForm, any> | Control<EditBoxForm, any>
    box?: BoxObject
    handleStartDate: (value: DateObject | DateObject[] | null) => void
    handleEndDate: (value: DateObject | DateObject[] | null) => void
    errors: FieldErrors<AddBoxForm> | FieldErrors<EditBoxForm>
    mark: string
  }

const BasicBoxInfoFormSection = (props: Props) => {

  const {
    page,
    control,
    box,
    errors,
    mark,
    handleStartDate,
    handleEndDate
  } = props

  return (
    <div className='formContainer'>
      <small className="pr-3 text-slate-500 inline-block font-bold">اطلاعات پایه</small>
      <div className="w-full grid grid-cols-4 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8">
        <CustomInput
          control={control}
          label='نام باکس'
          name={'name'}
          type='text'
          errors={errors.name?.message}
          required={true}
          message={'نام باکس را وارد کنید'}
          className='formInput w-full'
        />

      {
        mark === 'buyShort' &&
        <>
          <CustomInput
            control={control}
            label='کد پروژه'
            name={'projectNumber'}
            type='text'
            errors={errors.projectNumber?.message}
            required={true}
            message={'شماره پروژه را وارد کنید'}
            pattern={/^[P][R][0-9]{4}$/}
            patternMessage={'فرمت کد پروژه باید به صورت PR و چهار عدد بعد از آن باشد'}
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
