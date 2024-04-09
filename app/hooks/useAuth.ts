import { selectCurrentToken } from "../apiSlices/authSlice"
import { useSelector } from "react-redux"
import jwtDecode from 'jwt-decode'

type UserInfo = {
    id: string
    username:string
    name:string
    avatar: string
    roles: string[]
    active: boolean
}

const useAuth = () => {

    const token = useSelector(selectCurrentToken)
    let isMaster = false

    let isAdmin = true

    let isProjectManager = false

    let isMediaManager = false

    let status = 'پذیرشگر'

    if(token) {

        const decoded: any = jwtDecode(token)

        const { id, username, name, avatar, roles, active } : UserInfo = decoded.UserInfo

        isMediaManager = roles.includes('مدیررسانه')
        isProjectManager = roles.includes('مدیرپروژه')
        isAdmin = roles.includes('ادمین')
        isMaster = roles.includes('مستر')
        
        if(isMediaManager) status = 'مدیررسانه'
        if(isProjectManager) status = 'مدیرپروژه'
        if(isAdmin) status = 'ادمین'
        if(isMaster) status = 'مستر'

        return { id, username, name, avatar, roles, active, isMaster, isAdmin, isProjectManager, isMediaManager, status }
    }

    return { id:'', username:'', name:'', roles: [], avatar:'', isMediaManager, isProjectManager, isMaster, isAdmin, status }
}

export default useAuth