"use client"
import React from 'react'
import { useForm, useFieldArray, Controller } from "react-hook-form";

const Test = () => {

    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
        // defaultValues: {}; you can populate the fields by this attribute 
        defaultValues:{
            test:[{
                firstName: '',
                lastName: ''
            }]
        }
      });
      const { fields, append, remove } = useFieldArray({
        control,
        name: "test"
      });

  return (
    <form onSubmit={handleSubmit(data => console.log('DATA', data))}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input {...register(`test.${index}.firstName`)} />
            <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
            />
            <button
                className='btn-primary'
                type="button"
                onClick={() => remove(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        className='btn-primary'
        type="button"
        onClick={() => append({ firstName: "bill", lastName: "luo" })}
      >
        append
      </button>
      <input className='btn-primary' type="submit" />
    </form>
  )
}

export default Test