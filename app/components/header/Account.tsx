import Image from "next/image"

const Account = () => {
  return (
    <div className="bg-black dark:bg-white p-3 rounded-[44px] flex justify-center items-center gap-3">
        <Image 
            className="rounded-full cursor-pointer hover:scale-110 transition-all"
            src={'/images/profile-fallback.png'}
            alt="profile-image"
            width={35}
            height={35}
        />
        <p className="text-white dark:text-black font-bold">حمیدرضا هاشمی</p>
    </div>
  )
}

export default Account