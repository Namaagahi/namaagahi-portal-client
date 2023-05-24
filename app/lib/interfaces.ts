import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

export interface UserObject {
    id? : string,
    _id: string,
    name: string,
    avatar: string,
    username: string,
    roles : string[]
    password: string,
    active: boolean,
    __v: number,
    refreshToken?: string
  }

  export interface UserData {
    name?: string
    username?: string
    validUserName: boolean
    password: string
    validPassWord: boolean
    roles?: string[]
    active?: boolean
}

export interface NoteObject {
  id? : string,
  _id: string,
  user: string,
  title: string,
  text: string,
  completed?: boolean
  createdAt: string,
  updatedAt: string,
  username: string
}

export interface NoteData {
  title?: string,
  text?: string,
  completed?: boolean
  userId?:string
}

export interface GlobalState {
    user: UserObject | null,
    token: string | null
  }

export interface MenuItemsObj {
  name: string
  path: string
  icon: JSX.Element
}

export interface CustomError {
  data: {
      message: string
      stack: string
  }
}

export interface UserFormProps {
  error: FetchBaseQueryError | SerializedError | undefined | CustomError
  isError: boolean
  name: string
  username: string
  password: string
  validUserName: boolean
  validPassWord: boolean
  roles: string[]
  active?: boolean
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUserameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onActiveChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRolesChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export interface NoteFormProps {
  title: string 
  text: string
  userId: string
  completed: boolean
  options: JSX.Element[]
  error: FetchBaseQueryError | SerializedError | undefined | CustomError
  isError: boolean
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTextChange: (e: React.ChangeEventHandler<HTMLTextAreaElement>) => void
  onCompletedChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUserIdChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export interface CreateButtonProps {
  onClickHandler: () => void
  title: string
}

export interface DeleteModalContentProps {
  handleModal: () => void
  prop?: UserObject | NoteObject | undefined | any
  deleteType: string
}

export interface StatusProps { 
  status: string
  bgColor: string
  textColor: string 
}

export interface TableProps {
  tableContent: any
  tableHeadings: string[]
}

export interface ConfirmModalProps {
  type: string
  prop?: UserObject | NoteObject | undefined | any
  handleModal: () => void
  deleteType: string
}

export interface CreateUpdateModalProps {
  handleModal: () => void
  type: string
  prop?: UserObject | NoteObject | undefined | any
}

export interface EditUserProps {
  user: UserObject | undefined
  handleModal: () => void
}

export interface EditNoteProps {
  note: NoteObject | undefined
  users?: UserObject[] | undefined
  handleModal: () => void
}

export interface DeleteUserProps {
  user: UserObject | undefined
  handleModal: () => void
}

export interface DeleteNoteProps {
  note: NoteObject | undefined
  handleModal: () => void
}