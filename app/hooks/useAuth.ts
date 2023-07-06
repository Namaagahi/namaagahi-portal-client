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

        const { id, username, name, avatar, roles, active } : {id: string, username:string, name:string, avatar: string, roles: string[], active: boolean} = decoded.UserInfo
        isMediaManager = roles.includes('مدیررسانه')
        isAdmin = roles.includes('ادمین')

        if(isMediaManager) status = 'مدیررسانه'
        if(isAdmin) status = 'ادمین'

        return { id, username, name, avatar, roles, active, isAdmin, isMediaManager, status }
    }

    return { id:'', username:'', name:'', roles: [], avatar:'', isMediaManager, isAdmin, status}
}

export default useAuth