"use client"

import { selectCurrentToken } from "@/app/features/auth/authSlice";
import { useSelector } from "react-redux";

const Test = () => {
  const token = useSelector(selectCurrentToken);

  // console.log(token);
  
  return (
    <div>Test!</div>
  )
}


export default Test