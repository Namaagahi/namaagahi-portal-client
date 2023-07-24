"use client"
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { mockData } from '@/app/lib/constants'
import TableComponent from '@/app/components/table/TableComponent'

export type User = {
  name: string
  username: string
  avatar: string
  role: string
  status: string
}

const Test = () => {

  const columns = useMemo<ColumnDef<User, any>[]>(() => [
    {
      header: 'جدول کاربران',
      footer: props => props.column.id,
      columns: [
        {
          accessorKey: 'avatar',
          accessorFn: row => row.avatar,
          id: 'avatar',
          cell: info => info.getValue(),
          header: () => <span>آواتار</span>,
          footer: props => props.column.id,
        },
        {
          accessorFn: row => row.name,
          id: 'name',
          cell: info => info.getValue(),
          header: () => <span>نام</span>,
          footer: props => props.column.id,
        },
        {
          accessorFn: row => row.username,
          id: 'username',
          cell: info => info.getValue(),
          header: () => <span>نام کاربری</span>,
          footer: props => props.column.id,
        },
        {
          accessorFn: row => row.role,
          id: 'role',
          cell: info => info.getValue(),
          header: () => <span>سطح دسترسی</span>,
          footer: props => props.column.id,
        },
        {
          accessorFn: row => row.status,
          id: 'status',
          cell: info => info.getValue(),
          header: () => <span>وضعیت</span>,
          footer: props => props.column.id,
        },
      ],
    }
  ],
  []
)

const [data, setData] = useState<User[]>(mockData)

  return (
    <TableComponent 
      columns={columns}
      data={data}
    />
  )
}

export default Test
