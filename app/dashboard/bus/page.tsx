"use client"

import PageTitle from "@/app/components/main/PageTitle"
import UnderConstruction from "@/app/components/main/UnderConstruction"
import usePageTitle from "@/app/hooks/usePageTitle"

const Bus = () => {
  usePageTitle('رسانه | اتوبوس')

  return (
    <>
      <PageTitle name={'اتوبوس'} />
      <UnderConstruction desc="ماژولهای مربوط به اتوبوس" />
    </>
  )
}

export default Bus