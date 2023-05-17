import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
  return (
    <div>RequireAuth</div>
  )
}

export default RequireAuth
