import { ROLES } from "@/app/config/roles"
import { useAddNewUserMutation } from "@/app/state & api/usersApiSlice"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ImUserPlus } from 'react-icons/im'

const USER_REGEX = /^[A-z]{3,20}$/
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const { push } = useRouter()
    const [newUserData, setNewUserData] = useState({
        name:'',
        username: '',
        validUserName: false,
        password: '',
        validPassWord: false,
        roles: ['Planner']
    })

    useEffect(() => {
        setNewUserData({...newUserData, validUserName:USER_REGEX.test(newUserData.username)})
        setNewUserData({...newUserData, validPassWord:PASSWORD_REGEX.test(newUserData.password)})
    }, [newUserData.username, newUserData.password])

    useEffect(() => {
        if(isSuccess) {
            setNewUserData({...newUserData, name:'', username:'', password:'', roles:[]})
            push('/dashboard/users')
        }
    }, [isSuccess, push])

  return (
    <div>NewUserForm</div>
  )
}

export default NewUserForm