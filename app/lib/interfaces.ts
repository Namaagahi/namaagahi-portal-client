import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import { Control, FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
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
    password: string
    roles?: string[]
    active?: boolean
}

export interface UserFormProps {
  error: FetchBaseQueryError | SerializedError | undefined | CustomError | any
  isError: boolean
  name: string
  username: string
  password: string
  roles: string[]
  active?: boolean
  type: string
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
export interface BoxStructure {
    id? : string
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
    duration: {
      startDate: Date
      endDate: Date
      diff?: number
    },
    costs: {
      fixedCosts: {
        squareCost: string
        dailyCost?: number
        monthlyCost?: number
        periodCost?: number

      }, 
      variableCosts: {
        _id?: string
        name: string
        figures: {
          monthlyCost: number
          periodCost?: number
          dailyCost?: number
        }
      }[]
      dailyVariableCost?:number
      totalDailyCost?: number
      totalMonthlyCost?: number
      totalPeriodCost?: number

    },
    myCustomCost?: {
      [key: string]: number
    }
}

export interface BoxObject {
  id? : string
  _id: string
  boxId: string
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
    diff?: number
  }
  structures: BoxStructure[]
  updatedAt: string
  username: string
}

export interface AddBoxForm {
  boxId: string
  userId?: string
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
          monthlyCost: string | number
        }
      }[]
    },
    monthlyBaseFee : string
  }[]
}

export interface EditBoxForm {
  boxId: string
  userId?: string
  name: string
  mark: {
    name: string
    markOptions: {
      projectNumber: string
      brand: string
    }
  }
  duration: {
    startDate:  string | Date
    endDate:  string | Date
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
          monthlyCost: string
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
  username? : string
  parent: string
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

export interface EditStructureProps {
  structure: StructureObject | undefined
  handleModal: () => void
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
  main2?: string
  mainLink: string
  main2Link?: string
  subTitle?: string
  subTitleLink?: string
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

export interface BasicBoxInfoFormSectionProps {
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

export interface BoxStructuresFormSectionProps { 
  register: UseFormRegister<AddBoxForm>
  errors: FieldErrors<AddBoxForm>
  structuresField: FieldArrayWithId<AddBoxForm, "structures", "id">[]
  appendStructure: UseFieldArrayAppend<AddBoxForm, "structures">
  removeStructure:  UseFieldArrayRemove
  control: Control<AddBoxForm, any>
  setValue: UseFormSetValue<AddBoxForm>
  convertToNumber: (value: string) => number | null
}

export interface VariableCostsFormSectionProps { 
  register: UseFormRegister<AddBoxForm>
  fieldIndex: number
  control: Control<AddBoxForm, any>
  errors: FieldErrors<AddBoxForm>
  handleTextbox1Change: (event: React.ChangeEvent<HTMLInputElement>, fieldIndex: number, prop: any) => void
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

// INITIALCUSTOMERS ===========================================================================
export interface InitialCustomerObject {
  _id? : string
  id?: string
  userId: string
  username?: string
  name: string
  createdAt: string
  updatedAt: string
}

// PLANS ===========================================================================
export interface PlanObject {
  id? : string
  _id?: string
  __v?: number
  planId: string
  userId: string
  username?: string
  name: string
  customerName: string
  brand: string
  status?: string
  structures: {
    _id?: string
    structureId: string
    discountFee: string
    discountType: string
    monthlyFee: number
    monthlyFeeWithDiscount: number
    duration: {
      sellStart: string
      sellEnd: string
      diff?: number
    }
  }[]
  createdAt: string
  updatedAt: string
}
export interface CombinedStructure {
  id? : string
  _id? : string
  structureId:string
  name: string
  parent: string
  userId: string
  username: string
  costs: {
    fixedCosts: {
      squareCost: string
      dailyCost?: number
      monthlyCost?: number
      periodCost?: number

    }, 
    variableCosts: {
      _id?: string
      name: string
      figures: {
        monthlyCost: number
        periodCost?: number
        dailyCost?: number
      }
    }[]
    totalDailyCost?: number
    totalMonthlyCost?: number
    totalPeriodCost?: number
  },
  duration: {
    startDate: string
    endDate: string
    diff?: number
  }
  isAvailable: boolean
  isChosen: true
  location: {
    address: string
    district: number
    path: string
  },
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
  monthlyBaseFee: number
  updatedAt: string
  createdAt: string
  monthlyFee?: number
}

export interface AddPlanForm {
  name: string
  customerName: string
  brand: string
  structures: {
    structureId:string
    structureRecord: CombinedStructure | {}
    duration: {
      sellStart: string | null
      sellEnd: string | null
    }
    monthlyFee: string
    monthlyFeeWithDiscount: string
    discountFee: string
  }[]
}

export interface BasicPlanInfoSectionProps {
  register: UseFormRegister<AddPlanForm>
  errors: FieldErrors<AddPlanForm>
}

export interface PlanStructuresFormSectionProps {
  register: UseFormRegister<AddPlanForm>
  errors: FieldErrors<AddPlanForm>
  structuresField: FieldArrayWithId<AddPlanForm, "structures", "id">[]
  removeStructure: UseFieldArrayRemove
  appendStructure:  UseFieldArrayAppend<AddPlanForm, "structures">
  watch: UseFormWatch<AddPlanForm>
  convertToNumber: (value: string) => number 
  getValues: UseFormGetValues<AddPlanForm>
  setValue: UseFormSetValue<AddPlanForm>
  discountType: string
  handleDiscountType: (val: string) =>void
}

export interface DeletePlanProps {
  plan: PlanObject | undefined
  handleModal: () => void
}

// INITIALCUSTOMER ===========================================================================
export interface DeleteInitialCustomerProps {
  initialCustomer: InitialCustomerObject | undefined
  handleModal: () => void
}