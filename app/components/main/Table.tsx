const Table = ({ tableContent, tableHeadings }: {tableContent:any, tableHeadings:string[]}) => {

  return (
    <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400 ">
            <thead className="font-bold py-2 text-gray-700 dark:text-gray-400 border-y-2 border-y-[#FA9E93]  ">
              <tr>
                {tableHeadings && tableHeadings.map((prop:string, i:number) => (
                    <th key={`${prop}${i}`} scope="col" className="px-6 py-3">{prop}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableContent}
            </tbody>
          </table>
        </div>
  )
}

export default Table