"use client"
import { AiOutlineDoubleLeft, AiOutlineLeft, AiOutlineDoubleRight, AiOutlineRight } from 'react-icons/ai'
import { useEffect, useMemo, useState, useReducer } from 'react'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
    Column,
    Table,
    useReactTable,
    ColumnFiltersState,
    ColumnResizeMode,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    FilterFn,
    flexRender,
    ColumnDef,
  } from '@tanstack/react-table'


  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({ itemRank })
    return itemRank.passed
  }

  function Filter({ column, table }: { column: Column<any, unknown>, table: Table<any>}) {
    const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = useMemo(() =>
        typeof firstValue === 'number'
          ? []
          : Array.from(column.getFacetedUniqueValues().keys()).sort(),
      [column.getFacetedUniqueValues()]
    )

    return typeof firstValue === 'number' ? (
      <div>
        {/* <div className="flex gap-2 items-center justify-center mt-1">
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={value =>
              column.setFilterValue((old: [number, number]) => [value, old?.[1]])
            }
            placeholder={`حداقل ${
              column.getFacetedMinMaxValues()?.[0]
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            className="tableInput w-[65px]"
          />
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={value =>
              column.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder={`حداکثر ${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            className="tableInput w-[65px]"
          />
        </div> */}
        <div className="h-1" />
      </div>
    ) : (
      <>
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.slice(0, 5000).map((value: any, index: number) => (
            <option value={value} key={index} />
          ))}
        </datalist>
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? '') as string}
          onChange={value => column.setFilterValue(value)}
          placeholder={`جستجو... (${column.getFacetedUniqueValues().size})`}
          className="tableInputw-[65px]"
          list={column.id + 'list'}
        />
        <div className="h-1" />
      </>
    )
  }

  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)

      return () => clearTimeout(timeout)
    }, [value])

    return (
      <input {...props} value={value} onChange={e => setValue(e.target.value)} className='formInput text-black' />
    )
  }

  type Props = {
    columns:  ColumnDef<any, any>[]
    data: any
  }


const TableComponent = (props: Props) => {

  const { columns, data } = props

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [columnVisibility, setColumnVisibility] = useState({})
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
  const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange')
  const rerender = useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,

    columnResizeMode,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      columnVisibility: {...columnVisibility, _id: false, parent: false }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  })

  const handleChangeRowColor = (rowId: string) => {
    if (selectedRowId === rowId) {
      setSelectedRowId(null)
    } else {
      setSelectedRowId(rowId)
    }
  }



  return (
    <>
      <div className="p-2">
      <div>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          className="table-input"
          placeholder="جستجو در کل جدول ..."
        />
      </div>
      <div className="h-2" />
      <div className="relative overflow-x-auto scroll-smooth mt-5 max-w-full scrollbar scrollbar-thumb-primary scrollbar-track-gray-100">
        <div className="w-full flex items-center justify-between border p-1 shadow rounded-md mb-3 text-xs">
        {table.getAllLeafColumns().map(column => {
          if(column.id === '_id' || column.id === 'parent') return
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />
                {column.id}
              </label>
            </div>
          )
        })}
        </div>
        <table
          className="w-full text-sm text-right text-gray-500 dark:text-white"
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead className="tableHeading text-center bg-slate-50 dark:bg-primary dark:text-white">
            {table.getHeaderGroups().map(headerGroup => {
              return(
                <tr key={headerGroup.id}>
                  <th>{}</th>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        {...{
                          key: header.id,
                          colSpan: header.colSpan,
                          style: {
                            width: header.getSize(),
                          },
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: ' 🔼',
                                desc: ' 🔽',
                              }[header.column.getIsSorted() as string] ?? null}
                              <div
                                {...{
                                  onMouseDown: header.getResizeHandler(),
                                  onTouchStart: header.getResizeHandler(),
                                  className: `resizer ${
                                    header.column.getIsResizing() ? 'isResizing' : ''
                                  }`,
                                }}
                              />
                            </div>
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </>
                        )}
                      </th>
                    )
                  })}
                </tr>
              )}
            )}
          </thead>
          <tbody className='w-full'>
            {table.getRowModel().rows.map((row, index) => {
              return (
                <tr
                  key={row.id}
                  className={`${
                  selectedRowId === row.id
                    ? 'bg-buttonHover text-black'
                    : 'bg-white border-b dark:bg-gray-900'
                } dark:border-gray-700 text-center`}
              >
                  <td className='px-2'>{row.index + 1}</td>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td
                      {...{
                        key: cell.id,
                        style: {
                          width: cell.column.getSize(),
                        },
                      }}
                        className='py-2 px-2'
                        onClick={() => handleChangeRowColor(row.id)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                <th>{}</th>
                {footerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan} >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>

      <div className="h-2 mt-4" />
      </div>
    </div>
      <div className="flex items-center gap-2 mt-2">
        <button
          className={`${!table.getCanPreviousPage()? 'bg-gray-400' : 'bg-white'} border rounded-md p-1 text-black`}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <AiOutlineDoubleRight />
        </button>
        <button
          className={`${!table.getCanPreviousPage()? 'bg-gray-400' : 'bg-white'} border rounded-md p-1 text-black`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <AiOutlineRight />
        </button>
        <button
          className={`${!table.getCanNextPage()? 'bg-gray-400' : 'bg-white'} border rounded-md p-1 text-black`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <AiOutlineLeft />
        </button>
        <button
          className={`${!table.getCanNextPage()? 'bg-gray-400' : 'bg-white'} border rounded-md p-1 text-black`}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <AiOutlineDoubleLeft />
        </button>
        <span className="flex items-center gap-1">
          <div>صفحه</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} از{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | برو به صفحه:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="formInput text-black w-[30px] py-[9px]"
          />
        </span>
        <select
          className='formInput text-black '
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50, 100, 150].map(pageSize => (
            <option key={pageSize} value={pageSize} className='text-black'>
              نمایش {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default TableComponent
