import { PageTitleProps } from "@/app/lib/interfaces"

const PageTitle = (props: PageTitleProps) => {

  const { name } = props

  return (
    <div>
      <h1 className="text-3xl font-light py-[10px] dark:text-white">{name}</h1>
      <div className="w-full my-4 border-grayborder border-b-[1px] mb-6" />
    </div>
  )
}

export default PageTitle