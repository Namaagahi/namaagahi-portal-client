import BoxComp from '@/app/features/boxes/BoxComp'
import usePageTitle from '@/app/hooks/usePageTitle'

const MyBoxes = () => {
    usePageTitle('باکسهای من')

    return(
        <BoxComp page='my' />
    )
}

export default MyBoxes