"use client"

import PageTitle from "@/app/components/main/PageTitle"
import UnderConstruction from "@/app/components/main/UnderConstruction"
import usePageTitle from "@/app/hooks/usePageTitle"

const Namava = () => {
  usePageTitle('رسانه | نماوا')
  
  return (
    <>
      <PageTitle name={'نماوا'} />
      <UnderConstruction desc="ماژولهای مربوط به نماوا" />
    </>
  )
}

export default Namava