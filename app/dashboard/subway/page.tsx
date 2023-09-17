"use client"

import PageTitle from "@/app/components/main/PageTitle"
import UnderConstruction from "@/app/components/main/UnderConstruction"
import usePageTitle from "@/app/hooks/usePageTitle"

const Subway = () => {
  usePageTitle('رسانه | مترو')

  return (
    <>
      <PageTitle name={'مترو'} />
      <UnderConstruction desc="ماژولهای مربوط به مترو" />

    </>
  )
}

export default Subway