import { TableProps } from "@/app/lib/interfaces"

const Table = (props: TableProps) => {

  const { tableContent, tableHeadings } = props

  return (
    <div className="relative overflow-x-auto mt-5">
      <table className="w-full text-sm text-right text-gray-500 dark:text-gray-500">
        <thead className="table-heading">
          <tr>
            {tableHeadings && tableHeadings.map((prop:string, i:number) => (
              <th
                 
                key={`${prop}${i}`} 
                scope="col" 
                className="px-6 py-3"
                >
                  {prop}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          { tableContent }
        </tbody>
      </table>
    </div>
  )
}

export default Table