export interface User {
    _id: string,
    username: string
    roles : {
        Admin?: number
        MediaManager?: number
        Planner?: number
    }
    password: string
    __v: number,
    refreshToken?: string
  }

export interface GlobalState {
    currentUser: User | null
  }

export interface menuItemsObj {
  name: string
  path: string
  icon: JSX.Element
}