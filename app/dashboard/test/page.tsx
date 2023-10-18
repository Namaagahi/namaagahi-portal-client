'use client'

import { selectAllPlans, useGetAllPlansQuery } from "@/app/apiSlices/plansApiSlice"
import MyChart from "@/app/components/charts/Chart"
import PageTitle from "@/app/components/main/PageTitle"
import { PlanObject } from "@/app/lib/interfaces"
import { useTheme } from "next-themes"
import { useSelector } from "react-redux"

const Test = () => {

    const {
        theme,
      } = useTheme()
    
    useGetAllPlansQuery(undefined, {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false,
    })

    const allPlans: PlanObject[] = useSelector(state => selectAllPlans(state) as PlanObject[])

    return (
       <main className="min-h-screen">
            <PageTitle name={'تست'}/>
            <div className="grid grid-cols-2 items-center gap-3">
                <div className="w-full">
                    <MyChart
                        type={'line'}
                        mode={theme!}
                        title={'نمودار خرید سالیانه'}
                        displayTitle={true}
                        data={[8,15,21, 5, 18, 26, 37, 43, 22]}
                        labels= {['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']}
                        label={'خرید'}
                        darkColor={"#e07bbd"}
                        lightColor={'#6b0036'}
                        borderWidth={10}
                    />
                </div>
                <div className="w-full">
                    <MyChart
                        type={'bar'}
                        mode={theme!}
                        title={'نمودار فروش سالیانه'}
                        displayTitle={false}
                        data={[15,23,38, 15, 27, 9, 18, 45, 33]}
                        labels={[1,2,3,4,5,6]}
                        label={'فروش'}
                        darkColor={"#63a9ff"}
                        lightColor={"#002e5c"}
                    />
                </div>
                <div className="w-full">
                    <MyChart
                        type={'pie'}
                        mode={theme!}
                        title={'نمودار دایره ای'}
                        displayTitle={true}
                        data={[15,23,38]}
                        labels={['هندونه','بلوبری','سیب']}
                        label={'فروش'}
                        bgColors={ [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                          ]}
                    />
                </div>
            </div>
       </main>
    )
}

export default Test