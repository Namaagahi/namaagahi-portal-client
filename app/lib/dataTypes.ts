// // BUY
// interface Box {
//     boxType: string
//     boxName: string
//     startDate: Date
//     endDate: Date
//     projectId?: string
//     brand?: string
//     structuresWithFigures: {
//         structure: Structure,
//         expenses: [{
//             type: 
//         }]
//     }[]
//     plans: Plan[] | null
// }

interface Structure {
    id: string
    sysCode: number
    kind: string
    district: number
    path: string
    address: string
    style: string
    face: string
    length: number
    width: number
    printSize: number
    docSize: number
    isAvailable: boolean
    history: {
        buyPlans: [{
            financialYear: number
            startDate: Date
            endDate: Date
            squareCost: number
            monthlyCost: number
            maintenanceCosts: [{
                contractor: string
                unit: string
                serviceCost: number
            }] 
            totalCosts: number
        }]
        sellPlans: []
    }
}



// interface MaintenanceExpense {
//     contractorName: string
//     services: Service[]
// }

// interface Service {
//     serviceName: string
//     unit: string
//     serviceFee: number
// }

// // SELL
// interface Plan {
//     planId: string
//     status: string
//     projectNum?: string
//     suggestedPrice?: number
//     customerInfo: Customer 
//     brand: string
//     startDate?: Date
//     endDate?: Date
//     duration: number
//     isCultural: boolean
//     marketing?: {
//         name: string
//         percentage: number
//         fee: number
//     } 
//     structuresWithPrices: {
//         structure: Structure
//         suggestedPrices: {
//             monthlySale: number
//             discountPercentage: number
//             monthlySaleAfterDiscount: number
//             dayCount: number
//             coursePrice: number
//         }
//         finalPrices?: {
//             monthlySale: number
//             discountPercentage: number
//             monthlySaleAfterDiscount: number
//             dayCount: number
//             coursePrice: number
//         }
//     }[]
// }

// interface Customer {
//     agentName: string
//     companyName: string
//     role: string
//     economyCode?: string
//     registeryNum?: number
//     nationalCode?: number
//     address: string
//     phone: number
//     postalCode: number
// }