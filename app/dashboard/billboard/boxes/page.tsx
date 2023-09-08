"use client"
import BoxComp from '@/app/features/boxes/BoxComp'
import usePageTitle from '@/app/hooks/usePageTitle'

const Boxes = () => {
  usePageTitle('باکسها')

    return (
        <BoxComp page='all' />
    )
}

export default Boxes