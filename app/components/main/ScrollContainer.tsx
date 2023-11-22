import useScrollToBottom from '@/app/hooks/useScrollToBottom'
import useScrollToTop from '@/app/hooks/useScrollToTop'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'

const ScrollContainer = () => {

  const { showScrollButtonToBottom, handleScrollToBottom } = useScrollToBottom()
  const { showScrollButtonToTop, handleScrollToTop } = useScrollToTop()

  return (
    <>
      {showScrollButtonToBottom && (
        <BsFillArrowDownCircleFill
          className="scroll-to-bottom-button fixed left-3 top-1/2 cursor-pointer text-xl hover:text-bgform transition-all duration-300"
          onClick={handleScrollToBottom}
        />
      )}
      {showScrollButtonToTop && (
        <BsFillArrowUpCircleFill
          className="scroll-to-top-button fixed left-3 top-[47.5%] cursor-pointer text-xl hover:text-bgform transition-all duration-300"
          onClick={handleScrollToTop}
        />
      )}
    </>
  )
}

export default ScrollContainer
