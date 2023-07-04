import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import { Control, FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from "react-hook-form"
import { Value } from "react-multi-date-picker"

// USER ===========================================================================
export interface GlobalState {
  user: UserObject | null

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
  mark: {
    name: string
    markOptions: {
      projectNumber?: string
      brand?: string
    }
  }
  duration: {
    startDate: Date
    endDate: Date
  }
  structures: {
    structureId:string
    marks: {
      name: string
      markOptions: {
        style: string
        face: string
        length: string
        width: string
        printSize: string
        docSize: string
      }
    },
    costs: {
      fixedCosts: {
        squareCost: string
      }, 
      variableCosts: {
        name: string
        figures: {
          periodCost: string
        }
      }[]
    }
  }[]
  updatedAt: string
  username: string
}

export interface AddBoxForm {
  name: string
  mark: string
  projectNumber: string
  brand: string
  startDate:  string
  endDate:  string
  structures: {
    structureId:string
    marks: {
      name: string
      markOptions: {
        style: string
        face: string
        length: string
        width: string
        printSize: string
        docSize: string
      }
    },
    costs: {
      fixedCosts: {
        squareCost: string
      }, 
      variableCosts: {
        name: string
        figures: {
          periodCost: string
        }
      }[]
    }
  }[]
}


export interface DeleteBoxProps {
  box: BoxObject | undefined
  handleModal: () => void
}

export interface EditBoxProps {
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
  isChosen: boolean
}

export interface StructureObjectForm {
  name : string
  district: number
  path: string
  address: string
  isAvailable : boolean
  isChosen: boolean
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
// COMPONENT PROPS ===========================================================================
export interface CreateButtonProps {
  onClickHandler: () => void
  title: string
}

export interface BadgeProps {
  index: number
}

export interface CardProps {
  title: string 
  main: string
  mainLink: string
  subTitle: string
  subTitleLink: string
}

export interface DeleteModalContentProps {
  handleModal: () => void
  prop?: UserObject | NoteObject | StructureObject | undefined | any
  deleteType: string
}

export interface ListItemProps {
  number: number
  param: string
  prop: BoxObject
  startDate: string
  endDate: string
  diff: number
  titles: Object
}

export interface LogoutModalContentProps {
  handleModal: () => void
}

export interface PageTitleProps {
  name: string
}

export interface TitleProps {
  title: string
  fontSize: string
  bulletSize: number
}

export interface BasicInfoFormSectionProps {
  handleStartDate: (val: Value) => void
  handleEndDate: (val: Value) =>void
  register: UseFormRegister<AddBoxForm>
  errors: FieldErrors<AddBoxForm>
  mark: string 
}

export interface BoxItemProps {
  boxId: string
  index: number 
}

export interface StructuresFormSectionProps { 
  register: UseFormRegister<AddBoxForm>
  errors: FieldErrors<AddBoxForm>
  structuresField: FieldArrayWithId<AddBoxForm, "structures", "id">[]
  appendStructure: UseFieldArrayAppend<AddBoxForm, "structures">
  removeStructure:  UseFieldArrayRemove
  control: Control<AddBoxForm, any>
}

export interface VariableCostsFormSectionProps { 
  register: UseFormRegister<AddBoxForm>
  fieldIndex: number
  control: Control<AddBoxForm, any>
  errors: FieldErrors<AddBoxForm>
}

export interface NewNoteFormProps {
  users: UserObject[]
  handleModal: () => void
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

export interface AccessDeniedModalProps {
  handleModal: () => void
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
