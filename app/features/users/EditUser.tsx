
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUserById} from './usersApiSlice';
import Loading from '../loading/Loading';
import EditUserForm from './EditUserForm';
import { UserObject } from '@/app/lib/interfaces';



const EditUser = ({user, handleModal}: {user: UserObject | undefined, handleModal: () => void}) => {

    console.log(user)

  return (
    user ? <EditUserForm user={user} handleModal={handleModal} /> : <Loading />
  )
}

export default EditUser