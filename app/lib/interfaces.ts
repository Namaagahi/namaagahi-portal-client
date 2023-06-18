import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

// USER ===========================================================================
export interface GlobalState {
  user: UserObject | null,
  token: string | null
}

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

export interface UserFormProps {
  error: FetchBaseQueryError | SerializedError | undefined | CustomError | any
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

export interface EditUserProps {
  user: UserObject | undefined
  handleModal: () => void
}

export interface DeleteUserProps {
  user: UserObject | undefined
  handleModal: () => void
} 

// NOTE ===========================================================================
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

export interface NoteFormProps {
  title: string 
  text: string
  userId: string
  completed: boolean
  options: JSX.Element[]
  error: FetchBaseQueryError | SerializedError | undefined | CustomError | any
  isError: boolean
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTextChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | ((e: React.ChangeEventHandler<HTMLTextAreaElement>) => void) | any
  onCompletedChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUserIdChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | ((e: React.ChangeEventHandler<HTMLSelectElement>) => void) | any
}

export interface EditNoteProps {
  note: NoteObject | undefined
  users?: UserObject[] | undefined
  handleModal: () => void
}

export interface DeleteNoteProps {
  note: NoteObject | undefined
  handleModal: () => void
}

// BOX ===========================================================================
export interface BoxObject {
  id? : string
  _id: string
  userId: string
  name: string
  type: {
    name: string
    typeOptions: {
      projectNumber?: string
      brand?: string
    }
  }
  duration: {
    startDate: Date
    endDate: Date
  }
  structureIds: string[]
  updatedAt: string
  username: string
}

export interface AddBoxForm {
  name: string
  type: string
  projectNumber: string
  brand: string
  startDate:  string
  endDate:  string
  structures: {
    structureId:string
    types: {
      name: string
      typeOptions: {
        style: string
        face: string
        length: number
        width: number
        printSize: number
        docSize: number
      }
    },
    costs: {
      fixedCosts: {
        squareFee: number
      }
    }
  }[]
}


export interface DeleteBoxProps {
  box: BoxObject | undefined
  handleModal: () => void
}


// STRUCTURE ===========================================================================
export interface StructureObject {
  id? : string
  _id?: string
  userId: string
  name : string
  location: {
    district: number
    path: string
    address: string
  }
  isAvailable : boolean
}

export interface StructureObjectForm {
  name : string
  district: number
  path: string
  address: string
  isAvailable : boolean
}

export interface DeleteStructureProps {
  structure: StructureObject | undefined
  handleModal: () => void
}

export interface StructureData {
  sysCode? : string
  kind? : string
  district? : number
  path? : string
  address? : string
  style? : string
  face? : string
  dimensions? : string
  printSize? : number
  docSize? : number
  isAvailable? : boolean
  userId?:string
}
// OTHER ===========================================================================
export interface MenuItemsObj {
  name: string
  path: string
  icon: JSX.Element
}

export interface CustomError {
  data: {
      message: string
      stack: string
      error?: any
  }
  status?: number
}

export interface CreateButtonProps {
  onClickHandler: () => void
  title: string
}

export interface DeleteModalContentProps {
  handleModal: () => void
  prop?: UserObject | NoteObject | StructureObject | undefined | any
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
  prop?: UserObject | NoteObject | StructureObject | undefined | any
  handleModal: () => void
  deleteType?: string
}

export interface CreateUpdateModalProps {
  handleModal: () => void
  type: string
  prop?: UserObject | NoteObject | StructureObject | undefined | any
}

export interface BoxTypes {
  boxName: string
  startDate: Date
  endDate: Date
  path: string
  address: string
  addressId: string
  direction: string
  structureType: string
  district: string
  size : {
    dimensions: string
    printSize: number
    documentSize: number
  }
  feePersquare: number
  initialCost: number
  maintenanceCosts: {
    maintenance: number
    paintings: number
    power: number
    insurance: number
    other: number
  },
  totalCost: number
    
}