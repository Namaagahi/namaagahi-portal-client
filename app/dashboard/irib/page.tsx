"use client"

import PageTitle from "@/app/components/main/PageTitle"
import UnderConstruction from "@/app/components/main/UnderConstruction"
import usePageTitle from "@/app/hooks/usePageTitle"

const Irib = () => {
  usePageTitle('رسانه | صدا و سیما')

  return (
    <>
      <PageTitle name={'صدا و سیما'} />
      <UnderConstruction desc="ماژولهای مربوط به صدا و سیما" />
    </>
  )
}

export default Irib