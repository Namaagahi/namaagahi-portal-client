import { selectCurrentToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import jwtDecode from 'jwt-decode'

const useAuth = () => {

    const token = useSelector(selectCurrentToken)

    let isAdmin = false

    let isMediaManager = false

    let status = 'پذیرشگر'

    if(token) {

        const decoded: any = jwtDecode(token)

        const { username, name, avatar, roles, active } : {username:string, name:string, avatar: string, roles: string[], active: boolean} = decoded.UserInfo
        console.log(decoded.UserInfo)

        isMediaManager = roles.includes('مدیررسانه')
        isAdmin = roles.includes('ادمین')

        if(isMediaManager) status = 'مدیررسانه'
        if(isAdmin) status = 'ادمین'

        return { username, name, avatar, roles, active, isAdmin, isMediaManager, status }
    }

    return { username:'', name:'', roles: [], avatar:'', isMediaManager, isAdmin, status}
}

export default useAuth