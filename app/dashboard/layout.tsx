import Header from "../components/header/Header"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
       <Header/> 
        {children}
    </>
  )
}

export default MainLayout