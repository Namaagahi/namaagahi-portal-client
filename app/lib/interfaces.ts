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
      startDate: number
      endDate: number
      diff?: number
    },
    costs: {
      fixedCosts: {
        squareCost: string
        dailyCost: number
        monthlyCost: number
        periodCost: number

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
      dailyVariableCost:number
      totalDailyCost: number
      totalMonthlyCost: number
      totalPeriodCost: number
    },
    myCustomCost?: {
      [key: string]: number
    }
    name?:string
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
    startDate: number
    endDate: number
    diff?: number
  }
  structures: BoxStructure[]
  updatedAt: string
  username: string
  version: number
}

export interface AddBoxForm {
  boxId: string
  userId?: string
  name: string
  mark: string
  projectNumber: string
  brand: string
  startDate:  number
  endDate:  number
  structures: {
    structureId:string
    duration: {
      diff: number
      startDate: number
      endDate: number
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
  mark: string
  projectNumber: string
  brand: string
  startDate:  number
  endDate:  number
  structures: {
    structureId:string
    duration: {
      diff: number
      startDate: number
      endDate: number
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

export interface SubMenuItemsObj {
  name: string
  icon: JSX.Element
  menus: {
      name: string
      icon: JSX.Element
      path: string
  }[]
}[]

export interface CustomError {
  data: {
      message: string
      stack: string
      error?: any
  }
  status?: number
}

// PLANS ===========================================================================
export interface StructurePlanObject {
  _id?: string
  structureId: string
  discountFee: string
  discountType: string
  monthlyFee: number
  monthlyFeeWithDiscount: number
  duration: {
    sellStart: number
    sellEnd: number
    diff?: number
  }
  structureRecord: CombinedStructure
}

export interface PlanObject {
  id? : string
  _id?: string
  __v?: number
  planId: number
  userId: string
  username?: string
  name: string
  initialCustomerId: string
  finalCustomerId: string
  projectCodeId:string
  brand: string
  status?: string
  structures: StructurePlanObject[]
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
    startDate: number
    endDate: number
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
  initialCustomerId: string
  brand: string
  status: string
  structures: {
    structureId:string
    structureRecord: CombinedStructure
    duration: {
      sellStart: number
      sellEnd: number
    }
    monthlyFee: string
    monthlyFeeWithDiscount: string
    discountFee: string
    discountType?: string
  }[]
}

export interface EditPlanForm {
  name: string
  initialCustomerId: string
  brand: string
  status: string
  structures: {
    structureId:string
    structureRecord: CombinedStructure 
    duration: {
      sellStart: number
      sellEnd: number
    }
    monthlyFee: string
    monthlyFeeWithDiscount: string
    discountFee: string
    discountType?: string
  }[]
}

export interface PlanStructure {
  discountType: string
  structureId:string
  structureRecord: CombinedStructure 
  duration: {
    sellStart: string | null
    sellEnd: string | null
    diff: number
  }
  monthlyFee: string
  monthlyFeeWithDiscount: string
  discountFee: string
  totalPeriodCost: string
}[]

// INITIALCUSTOMER ===========================================================================
export interface InitialCustomerObject {
  _id? : string
  id?: string
  userId: string
  username?: string
  name: string
  createdAt: string
  updatedAt: string
}

// FINALCUSTOMER ===========================================================================
export interface FinalCustomerObject {
  _id? : string
  id?: string
  finalCustomerId: string
  userId: string
  name: string
  contractType: string
  customerType: string
  agent: {
    agentName: string
    post: string
  }[]
  nationalId: number
  ecoCode: number
  regNum: number
  address: string
  postalCode: number
  phone: number
  planIds: string[]
  createdAt: string
  updatedAt: string
  username?: string
}

export interface AddFinalCustomerForm {
  finalCustomerId: string
  name: string
  contractType: string
  customerType: string
  agent: {
    agentName: string
    post: string
  }[]
  nationalId: string
  ecoCode: string
  regNum: string
  address: string
  postalCode: string
  phone: string
}

export interface EditFinalCustomerForm {
  finalCustomerId: string
  name: string
  contractType: string
  customerType: string
  agent: {
    agentName: string
    post: string
  }[]
  nationalId: number
  ecoCode: number
  regNum: number
  address: string
  postalCode: number
  phone: number
  planIds: string[]
}

export interface AgentObject {
  agentName: string
  post: string
  _id?: string
}

// PROJECT CODE ===========================================================================
export interface ProjectCodeObject {
  _id?: string
  id?:string
  userId: string
  media: string
  year: number
  finalCustomerId: string
  brand: string
  desc: string
  code: string
  username?:string
  createdAt?: string
  updatedAt?: string
  __v?: string
}

export interface AddProjectCodeForm {
  media: string
  year: string
  finalCustomerId: string
  brand: string
  desc: string
}

export interface EditProjectCodeForm {
  media: string
  year: number
  finalCustomerId: string
  brand: string
  desc: string
}