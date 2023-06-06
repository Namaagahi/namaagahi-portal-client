// BUY
interface Box {
    boxType: string
    boxName: string
    startDate: Date
    endDate: Date
    projectId?: string
    brand?: string
    structuresWithExpenses: {
        structure: Structure,
        buyExpenses: {
            squareFee: number
            monthlyFee: number 
            yearlyFee: number // (monthlyFee / 30) * ((box.endDate - box.startDate) + 1)
        }
        maintenanceExpenses: MaintenanceExpense[]
    }[]
    plans: Plan[] | null
}

interface Structure {
    sysCode: number
    kind: string
    district: number
    path: string
    address: string
    style: string
    face: string
    dimensions: string
    printSize: number
    docSize: number
    isAvailable: boolean
}

interface MaintenanceExpense {
    contractorName: string
    services: Service[]
}

interface Service {
    serviceName: string
    unit: string
    serviceFee: number
}

// SELL
interface Plan {
    planId: string
    status: string
    projectNum?: string
    suggestedPrice?: number
    customerInfo: Customer 
    brand: string
    startDate?: Date
    endDate?: Date
    duration: number
    isCultural: boolean
    marketing?: {
        name: string
        percentage: number
        fee: number
    } 
    structuresWithPrices: {
        structure: Structure
        suggestedPrices: {
            monthlySale: number
            discountPercentage: number
            monthlySaleAfterDiscount: number
            dayCount: number
            coursePrice: number
        }
        finalPrices?: {
            monthlySale: number
            discountPercentage: number
            monthlySaleAfterDiscount: number
            dayCount: number
            coursePrice: number
        }
    }[]
}

interface Customer {
    agentName: string
    companyName: string
    role: string
    economyCode?: string
    registeryNum?: number
    nationalCode?: number
    address: string
    phone: number
    postalCode: number
}