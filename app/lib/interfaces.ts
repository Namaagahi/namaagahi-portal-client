export interface User {
    _id: string,
    name:string,
    avatar: string,
    username: string,
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
    user: User | null,
    token: string | null
  }

export interface menuItemsObj {
  name: string
  path: string
  icon: JSX.Element
}